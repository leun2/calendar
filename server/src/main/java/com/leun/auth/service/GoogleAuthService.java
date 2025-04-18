package com.leun.auth.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.leun.auth.config.GoogleConfig;
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
import java.util.Collections;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {

    private final GoogleConfig googleConfig;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserSettingRepository userSettingRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public LoginDto.Response googleLogin(String credential) throws Exception {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
            .setAudience(Collections.singletonList(googleConfig.getClientId()))
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
}