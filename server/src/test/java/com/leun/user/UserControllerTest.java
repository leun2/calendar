package com.leun.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leun.user.controller.UserController;
import com.leun.user.dto.UserDto;
import com.leun.user.dto.UserProfileDto;
import com.leun.user.dto.UserProfileDto.Request.Name;
import com.leun.user.dto.UserSettingDto;
import com.leun.user.dto.UserSettingDto.Request.Country;
import com.leun.user.dto.UserSettingDto.Request.Language;
import com.leun.user.dto.UserSettingDto.Request.Timezone;
import com.leun.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private final String email = "lee@example.com";

    @Test
    @WithMockUser
    public void registerUserTest() throws Exception {

        UserDto.Request request = new UserDto.Request();
        request.setEmail(email);
        request.setPassword("1234");
        request.setName("lee");

        doNothing().when(userService).registerUser(request);

        String mockRequest = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/v1/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mockRequest)
                .with(csrf()))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void getUserProfileTest() throws Exception {

        UserProfileDto.Response expectedProfile = new UserProfileDto.Response("lee", "/default");

        when(userService.getUserProfileByEmail(anyString())).thenReturn(expectedProfile);

        mockMvc.perform(get("/v1/user/profile"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("lee"))
            .andExpect(jsonPath("$.image").value("/default"));

        verify(userService, times(1)).getUserProfileByEmail("lee@example.com");
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void getUserSettingTest() throws Exception {

        UserSettingDto.Response expectedSetting =
            new UserSettingDto.Response("Korean", "South Korea", "KST +09:00");

        when(userService.getUserSettingByEmail(anyString())).thenReturn(expectedSetting);

        mockMvc.perform(get("/v1/user/setting"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.language").value("Korean"))
            .andExpect(jsonPath("$.country").value("South Korea"))
            .andExpect(jsonPath("$.timezone").value("KST +09:00"));

        verify(userService, times(1)).getUserSettingByEmail("lee@example.com");
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void updateUserProfileNameTest() throws Exception {

        UserProfileDto.Request.Name request = new Name();
        request.setName("kim");

        UserProfileDto.Response expectedProfile = new UserProfileDto.Response("kim", "/default");

        when(userService.updateUserProfileName(email, request.getName())).thenReturn(expectedProfile);

        String mockRequest = objectMapper.writeValueAsString(request);

        mockMvc.perform(patch("/v1/user/profile/name")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mockRequest)
                .with(csrf()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("kim"))
            .andExpect(jsonPath("$.image").value("/default"));

        verify(userService, times(1)).updateUserProfileName("lee@example.com", "kim");
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void updateUserSettingLanguageTest() throws Exception {

        UserSettingDto.Request.Language request = new Language();
        request.setLanguage("eng");

        UserSettingDto.Response expectedSetting =
            new UserSettingDto.Response("eng", "South Korea", "KST +09:00");

        when(userService.updateUserSettingLanguage(email, request.getLanguage())).thenReturn(expectedSetting);

        String mockRequest = objectMapper.writeValueAsString(request);

        mockMvc.perform(patch("/v1/user/setting/language")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mockRequest)
                .with(csrf()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.language").value("eng"))
            .andExpect(jsonPath("$.country").value("South Korea"))
            .andExpect(jsonPath("$.timezone").value("KST +09:00"));

        verify(userService, times(1)).updateUserSettingLanguage("lee@example.com", "eng");
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void updateUserSettingCountryTest() throws Exception {

        UserSettingDto.Request.Country request = new Country();
        request.setCountry("jp");

        UserSettingDto.Response expectedSetting =
            new UserSettingDto.Response("Korean", "jp", "KST +09:00");

        when(userService.updateUserSettingCountry(email, request.getCountry())).thenReturn(expectedSetting);

        String mockRequest = objectMapper.writeValueAsString(request);

        mockMvc.perform(patch("/v1/user/setting/country")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mockRequest)
                .with(csrf()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.language").value("Korean"))
            .andExpect(jsonPath("$.country").value("jp"))
            .andExpect(jsonPath("$.timezone").value("KST +09:00"));

        verify(userService, times(1)).updateUserSettingCountry("lee@example.com", "jp");
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void updateUserSettingTimezoneTest() throws Exception {

        UserSettingDto.Request.Timezone request = new Timezone();
        request.setTimezone("JST +09:00");

        UserSettingDto.Response expectedSetting =
            new UserSettingDto.Response("Korean", "South Korea", "JST +09:00");

        when(userService.updateUserSettingTimezone(email, request.getTimezone())).thenReturn(expectedSetting);

        String mockRequest = objectMapper.writeValueAsString(request);

        mockMvc.perform(patch("/v1/user/setting/timezone")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mockRequest)
                .with(csrf()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.language").value("Korean"))
            .andExpect(jsonPath("$.country").value("South Korea"))
            .andExpect(jsonPath("$.timezone").value("JST +09:00"));

        verify(userService, times(1)).updateUserSettingTimezone("lee@example.com", "JST +09:00");
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void deleteUserTest() throws Exception {
        doNothing().when(userService).removeUser(email);

        mockMvc.perform(delete("/v1/user")
                .with(csrf()))
            .andExpect(status().isOk());

        verify(userService, times(1)).removeUser(email);
    }
}
