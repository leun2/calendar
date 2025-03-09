package com.leun.user;

import com.leun.user.dto.UserDto;
import com.leun.user.dto.UserProfileDto;
import com.leun.user.dto.UserSettingDto;
import com.leun.user.repository.UserProfileRepository;
import com.leun.user.repository.UserRepository;
import com.leun.user.repository.UserSettingRepository;
import com.leun.user.service.UserService;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.argThat;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserProfileRepository userProfileRepository;

    @Mock
    private UserSettingRepository userSettingRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private final String email = "lee@example.com";

    @BeforeEach
    void setUp() {

    }

    @AfterEach
    void tearDown() {

    }

    @Test
    void registerUser_whenUserDoesNotExist() throws Exception {

        UserDto.Request request = new UserDto.Request();
        request.setEmail("lee@example.com");
        request.setPassword("password");
        request.setName("lee");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        userService.registerUser(request);

        verify(userRepository).save(argThat(user ->
            "lee@example.com".equals(user.getEmail()) && "encodedPassword".equals(user.getPassword())
        ));

        verify(userProfileRepository).save(argThat(profile ->
            "lee".equals(profile.getName()) &&
                profile.getUser() != null
        ));

        verify(userSettingRepository).save(argThat(setting ->
            "Korean".equals(setting.getLanguage()) &&
                "South Korea".equals(setting.getCountry())
        ));
    }

    @Test
    void getUserProfile_shouldReturnUserProfileDto() throws Exception {

        UserProfileDto.Response expectedProfile = new UserProfileDto.Response("lee", "/default");

        when(userProfileRepository.findUserProfileByEmail(email)).thenReturn(expectedProfile);

        UserProfileDto.Response actualProfile = userService.getUserProfileByEmail(email);

        assertEquals(expectedProfile, actualProfile);

        verify(userProfileRepository, times(1)).findUserProfileByEmail(email);
    }

    @Test
    void getUserProfile_shouldThrowExceptionWhenUserNotFound() {

        when(userProfileRepository.findUserProfileByEmail(email)).thenReturn(null);

        NoSuchElementException exception = assertThrows(NoSuchElementException.class,
            () -> userService.getUserProfileByEmail(email));

        assertEquals("User profile not found for email: " + email, exception.getMessage());

        verify(userProfileRepository, times(1)).findUserProfileByEmail(email);
    }

    @Test
    void getUserSetting_shouldReturnUserSettingDto() throws Exception {

        UserSettingDto.Response expectedSetting =
            new UserSettingDto.Response("Korean", "South Korea", "KST +09:00");

        when(userSettingRepository.findUserSettingByEmail(email)).thenReturn(expectedSetting);

        UserSettingDto.Response actualSetting = userService.getUserSettingByEmail(email);

        assertEquals(expectedSetting, actualSetting);

        verify(userSettingRepository, times(1)).findUserSettingByEmail(email);
    }

    @Test
    void getUserSetting_shouldThrowExceptionWhenUserNotFound() {

        when(userSettingRepository.findUserSettingByEmail(email)).thenReturn(null);

        NoSuchElementException exception = assertThrows(NoSuchElementException.class,
            () -> userService.getUserSettingByEmail(email));

        assertEquals("User setting not found for email: " + email, exception.getMessage());

        verify(userSettingRepository, times(1)).findUserSettingByEmail(email);
    }

    @Test
    void updateUserProfileName_shouldReturnUserProfileDto() throws Exception {

        String newName = "UpdatedName";
        UserProfileDto.Response mockResponse = new UserProfileDto.Response(newName, "/default");

        doNothing().when(userProfileRepository).updateUserName(email, newName);
        when(userProfileRepository.findUserProfileByEmail(email)).thenReturn(mockResponse);

        UserProfileDto.Response result = userService.updateUserProfileName(email, newName);

        assertNotNull(result);
        assertEquals(newName, result.getName());

        verify(userProfileRepository).updateUserName(email, newName);
        verify(userProfileRepository).findUserProfileByEmail(email);
    }

    @Test
    void updateUserSettingLanguage_shouldReturnUserSettingDto() throws Exception {

        String newLanguage = "fr";
        UserSettingDto.Response mockResponse = new UserSettingDto.Response(newLanguage, "KR", "Asia/Seoul");

        doNothing().when(userSettingRepository).updateUserLanguage(email, newLanguage);
        when(userSettingRepository.findUserSettingByEmail(email)).thenReturn(mockResponse);

        UserSettingDto.Response result = userService.updateUserSettingLanguage(email, newLanguage);

        assertNotNull(result);
        assertEquals(newLanguage, result.getLanguage());

        verify(userSettingRepository).updateUserLanguage(email, newLanguage);
        verify(userSettingRepository).findUserSettingByEmail(email);
    }

    @Test
    void updateUserSettingCountry_shouldReturnUserSettingDto() throws Exception {

        String newCountry = "US";
        UserSettingDto.Response mockResponse = new UserSettingDto.Response("en", newCountry, "America/New_York");

        doNothing().when(userSettingRepository).updateUserCountry(email, newCountry);
        when(userSettingRepository.findUserSettingByEmail(email)).thenReturn(mockResponse);

        UserSettingDto.Response result = userService.updateUserSettingCountry(email, newCountry);

        assertNotNull(result);
        assertEquals(newCountry, result.getCountry());

        verify(userSettingRepository).updateUserCountry(email, newCountry);
        verify(userSettingRepository).findUserSettingByEmail(email);
    }

    @Test
    void updateUserSettingTimezone_shouldReturnUserSettingDto() throws Exception {
        String newTimezone = "Europe/London";
        UserSettingDto.Response mockResponse = new UserSettingDto.Response("en", "UK", newTimezone);

        doNothing().when(userSettingRepository).updateUserTimezone(email, newTimezone);
        when(userSettingRepository.findUserSettingByEmail(email)).thenReturn(mockResponse);

        UserSettingDto.Response result = userService.updateUserSettingTimezone(email, newTimezone);

        assertNotNull(result);
        assertEquals(newTimezone, result.getTimezone());

        verify(userSettingRepository).updateUserTimezone(email, newTimezone);
        verify(userSettingRepository).findUserSettingByEmail(email);
    }

    @Test
    void removeUser_whenUserIsExist() throws Exception {
        doNothing().when(userRepository).deleteUserByEmail(email);

        userService.removeUser(email);

        verify(userRepository, times(1)).deleteUserByEmail(email);
    }

    @Test
    void removeUser_shouldThrowException_whenUserDoesNotExist() {
        doThrow(new EmptyResultDataAccessException(1)).when(userRepository).deleteUserByEmail(email);

        assertThrows(EmptyResultDataAccessException.class, () -> userService.removeUser(email));

        verify(userRepository, times(1)).deleteUserByEmail(email);
    }
}
