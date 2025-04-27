package com.leun.auth.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.leun.auth.config.OAuthConfig;
import com.leun.auth.dto.LoginDto;
import com.leun.auth.security.JwtUtil;
import com.leun.user.dto.UserSettingDto;
import com.leun.user.entity.User;
import com.leun.user.entity.User.ProviderType;
import com.leun.user.entity.User.UserRole;
import com.leun.user.entity.UserProfile;
import com.leun.user.entity.UserSetting;
import com.leun.user.repository.UserProfileRepository;
import com.leun.user.repository.UserRepository;
import com.leun.user.repository.UserSettingRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final OAuthConfig oauthConfig;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserSettingRepository userSettingRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public LoginDto.Response googleLogin(String credential) throws Exception {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
            .setAudience(Collections.singletonList(oauthConfig.getClientId()))
            .build();

        GoogleIdToken idToken = verifier.verify(credential);
        if (idToken == null) {
            throw new IllegalArgumentException("Invalid Google ID token.");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String imageUrl = (String) payload.get("picture");

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            // Google OAuth로 처음 로그인하는 경우, 사용자 등록
            user = new User(email, passwordEncoder.encode("password"), ProviderType.GOOGLE, UserRole.ROLE_USER);
            userRepository.save(user);

            UserProfile userProfile = new UserProfile(user, name, imageUrl);
            userProfileRepository.save(userProfile);

            UserSetting userSetting = new UserSetting(user, "Korean", "South Korea", "KST +09:00");
            userSettingRepository.save(userSetting);
        } else if (user.getProvider() != ProviderType.GOOGLE) {
            throw new IllegalArgumentException("이미 다른 방식으로 가입된 이메일입니다.");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        UserProfile profile = userProfileRepository.findByUser(user)
            .orElseThrow(() -> new NoSuchElementException("User Profile Not Found"));
        UserSetting setting = userSettingRepository.findByUser(user)
            .orElseThrow(() -> new NoSuchElementException("User Setting Not Found"));

        UserSettingDto.Response settingDto =
            new UserSettingDto.Response(setting.getLanguage(), setting.getCountry(), setting.getTimezone());

        return new LoginDto.Response(profile.getName(), profile.getImage(), settingDto, token);
    }

    @Transactional
    public LoginDto.Response googleLoginWithAuthCode(String authCode) throws Exception { // 인증 코드를 인자로 받습니다.

        if (authCode == null || authCode.isEmpty()) {
            throw new IllegalArgumentException("Authorization code cannot be null or empty.");
        }

        // 1. 인증 코드를 사용하여 Google로부터 토큰(ID 토큰, Access 토큰)을 교환합니다.
        //    이 과정에서 Google API 라이브러리가 필요하며, Client Secret이 사용됩니다.
        GoogleTokenResponse tokenResponse;
        try {
            tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                new NetHttpTransport(), // HTTP 전송 계층
                new GsonFactory(), // JSON 파싱 라이브러리 (Gson 사용 가정)
                oauthConfig.getClientId(), // application.yml 또는 GoogleConfig에서 주입받은 Client ID
                oauthConfig.getClientSecret(), // application.yml 또는 GoogleConfig에서 주입받은 Client Secret (!!서버에서만 사용!!)
                authCode, // 클라이언트로부터 받은 인증 코드
                oauthConfig.getRedirectUri() // application.yml 또는 GoogleConfig에서 주입받은 Redirect URI
            ).execute(); // Google API에 서버 간 요청 전송

        } catch (IOException e) {
            // Google API 통신 오류 발생 시 처리
            throw new Exception("Failed to exchange auth code for tokens with Google.", e);
        }

        // 2. Google로부터 받은 응답에서 ID 토큰 문자열을 추출합니다.
        String idTokenString = tokenResponse.getIdToken();
        if (idTokenString == null) {
            // ID 토큰이 응답에 포함되지 않은 경우 (scope 설정 확인 필요)
            throw new Exception("ID token not received from Google token endpoint.");
        }

        // 3. 추출한 ID 토큰 문자열을 검증합니다. (기존 GoogleIdTokenVerifier 재활용)
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
            .setAudience(Collections.singletonList(oauthConfig.getClientId())) // Client ID로 Audience 설정
            .build();

        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(idTokenString); // ID 토큰 문자열 검증
        } catch (GeneralSecurityException | IOException e) {
            // 토큰 검증 라이브러리 오류 발생 시 처리
            throw new Exception("Failed to verify Google ID token.", e);
        }


        if (idToken == null) {
            // 토큰 검증 실패 (위변조되었거나, 만료되었거나, Audience가 다르거나 등)
            throw new IllegalArgumentException("Invalid or expired Google ID token.");
        }

        // 4. ID 토큰 검증 성공 후 페이로드에서 사용자 정보 추출 (기존 로직과 유사)
        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String imageUrl = (String) payload.get("picture");
        // 필요한 경우 locale 등 추가 정보 추출 가능

        // 5. 백엔드 사용자 처리 (기존 사용자 찾기 또는 새로 생성) - 기존 로직 재활용 가능
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            // Google OAuth로 처음 로그인하는 경우, 사용자 등록
            user = new User(email, passwordEncoder.encode("password"), ProviderType.GOOGLE, UserRole.ROLE_USER);
            userRepository.save(user);

            UserProfile userProfile = new UserProfile(user, name, imageUrl); // 이미지 URL 저장
            userProfileRepository.save(userProfile);

            UserSetting userSetting = new UserSetting(user, "Korean", "South Korea", "KST +09:00"); // 기본 설정
            userSettingRepository.save(userSetting);
        } else if (user.getProvider() != ProviderType.GOOGLE) {
            // 이미 다른 방식으로 가입된 이메일인 경우
            throw new IllegalArgumentException("이미 다른 방식으로 가입된 이메일입니다.");
        }

        // 6. 백엔드 JWT 토큰 생성 (기존 로직 재활용)
        String token = jwtUtil.generateToken(user.getEmail());

        // 7. 사용자 프로필 및 설정 조회 (기존 로직 재활용)
        UserProfile profile = userProfileRepository.findByUser(user)
            .orElseThrow(() -> new NoSuchElementException("User Profile Not Found"));
        UserSetting setting = userSettingRepository.findByUser(user)
            .orElseThrow(() -> new NoSuchElementException("User Setting Not Found"));

        // 8. 응답 DTO 생성 및 반환 (기존 로직 재활용)
        UserSettingDto.Response settingDto =
            new UserSettingDto.Response(setting.getLanguage(), setting.getCountry(), setting.getTimezone());

        // 백엔드 응답 DTO는 백엔드가 생성한 JWT와 사용자 정보를 포함해야 합니다.
        // LoginDto.Response 구조 확인 필요
        return new LoginDto.Response(profile.getName(), profile.getImage(), settingDto, token); // 예시: 이름, 이미지, 설정, 토큰 반환
    }
}