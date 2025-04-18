package com.leun.user.controller;

import com.leun.user.dto.UserDto;
import com.leun.user.dto.UserProfileDto;
import com.leun.user.dto.UserSettingDto;
import com.leun.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {

        return ResponseEntity.ok("pong");
    }

    @PostMapping("/user")
    public void registerUser(@RequestBody @Valid UserDto.Request request) throws Exception {
        userService.registerUser(request);
    }

    @GetMapping("/user/profile")
    public ResponseEntity<UserProfileDto.Response> getUserProfile(
        @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        UserProfileDto.Response response =
            userService.getUserProfileByEmail(userDetails.getUsername());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/setting")
    public ResponseEntity<UserSettingDto.Response> getUserSetting(
        @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        UserSettingDto.Response response =
            userService.getUserSettingByEmail(userDetails.getUsername());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/user/profile/name")
    public ResponseEntity<UserProfileDto.Response> updateUserProfileName(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody UserProfileDto.Request.Name userProfileDto) throws Exception {

        UserProfileDto.Response response =
            userService.updateUserProfileName(userDetails.getUsername(), userProfileDto.getName());

        return ResponseEntity.ok(response);
    }

//    @PatchMapping("/user/profile/image")
//    public void updateUserProfileImage(@AuthenticationPrincipal UserDetails userDetails,
//        @RequestBody UserProfileDto.Request.Image userProfileDto) {
//
//    }

    @PatchMapping("/user/setting/language")
    public ResponseEntity<UserSettingDto.Response> updateUserSettingLanguage(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody UserSettingDto.Request.Language request) throws Exception {

        UserSettingDto.Response response =
            userService.updateUserSettingLanguage(userDetails.getUsername(), request.getLanguage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/user/setting/country")
    public ResponseEntity<UserSettingDto.Response> updateUserSettingCountry(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody UserSettingDto.Request.Country request) throws Exception {

        UserSettingDto.Response response =
            userService.updateUserSettingCountry(userDetails.getUsername(), request.getCountry());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/user/setting/timezone")
    public ResponseEntity<UserSettingDto.Response> updateUserSettingTimezone(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody UserSettingDto.Request.Timezone request) throws Exception {

        UserSettingDto.Response response =
            userService.updateUserSettingTimezone(userDetails.getUsername(), request.getTimezone());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/user")
    public void deleteUser(@AuthenticationPrincipal UserDetails userDetails) throws Exception {

        userService.removeUser(userDetails.getUsername());
    }
}
