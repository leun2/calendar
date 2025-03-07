package com.leun.auth.service;

import com.leun.auth.dto.LoginDto;
import com.leun.auth.dto.LoginDto.Response;
import com.leun.auth.security.JwtUtil;
import com.leun.user.dto.UserSettingDto;
import com.leun.user.entity.User;
import com.leun.user.entity.UserProfile;
import com.leun.user.entity.UserSetting;
import com.leun.user.repository.UserProfileRepository;
import com.leun.user.repository.UserSettingRepository;
import com.leun.user.service.UserService;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final UserProfileRepository userProfileRepository;
    private final UserSettingRepository userSettingRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public LoginDto.Response login(LoginDto.Request request) {
        User user = userService.findUserByEmail(request.getEmail());

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Password Does Not Exist");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        UserProfile profile = userProfileRepository.findByUser(user)
            .orElseThrow(() -> new NoSuchElementException("User Does Not Exist"));

        UserSetting setting = userSettingRepository.findByUser(user)
            .orElseThrow(() -> new NoSuchElementException("User Does Not Exist"));

        UserSettingDto.Response settingDto =
            new UserSettingDto.Response(setting.getLanguage(), setting.getCountry(), setting.getTimezone());

        return new Response(profile.getName(), profile.getImage(), settingDto, token);
    }
}