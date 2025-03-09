package com.leun.user.service;

import com.leun.user.dto.UserDto;
import com.leun.user.dto.UserProfileDto;
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
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserSettingRepository userSettingRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void registerUser(UserDto.Request request) throws Exception {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User Already Exists");
        }

        User user = new User(request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            ProviderType.LOCAL,
            UserRole.ROLE_USER);

        UserProfile userProfile = new UserProfile(user, request.getName(), "/default");

        UserSetting userSetting =
            new UserSetting(user, "Korean", "South Korea", "KST +09:00");

        userRepository.save(user);

        userProfileRepository.save(userProfile);

        userSettingRepository.save(userSetting);
    }

    public UserProfileDto.Response getUserProfileByEmail(String email) throws Exception {

        UserProfileDto.Response profile = userProfileRepository.findUserProfileByEmail(email);
        if (profile == null) {
            throw new NoSuchElementException("User profile not found for email: " + email);
        }
        return profile;
    }

    public UserSettingDto.Response getUserSettingByEmail(String email) throws Exception {

        UserSettingDto.Response setting = userSettingRepository.findUserSettingByEmail(email);

        if (setting == null) {
            throw new NoSuchElementException("User setting not found for email: " + email);
        }
        return setting;
    }

    @Transactional
    public UserProfileDto.Response updateUserProfileName(String email, String name) throws Exception {

        userProfileRepository.updateUserName(email, name);

        return userProfileRepository.findUserProfileByEmail(email);
    }

    @Transactional
    public UserSettingDto.Response updateUserSettingLanguage(String email, String language) throws Exception {

        userSettingRepository.updateUserLanguage(email, language);

        return userSettingRepository.findUserSettingByEmail(email);
    }

    @Transactional
    public UserSettingDto.Response updateUserSettingCountry(String email, String country) throws Exception {

        userSettingRepository.updateUserCountry(email, country);

        return userSettingRepository.findUserSettingByEmail(email);
    }

    @Transactional
    public UserSettingDto.Response updateUserSettingTimezone(String email, String timezone) throws Exception {

        userSettingRepository.updateUserTimezone(email, timezone);

        return userSettingRepository.findUserSettingByEmail(email);
    }

    @Transactional
    public void removeUser(String email) throws Exception {

        userRepository.deleteUserByEmail(email);
    }

    public User findUserByEmail(String email) throws Exception {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new NoSuchElementException("User Does Not Exist"));
    }
}
