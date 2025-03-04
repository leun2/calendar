package com.leun.user.controller;

import com.leun.user.dto.UserDto;
import com.leun.user.dto.UserProfileDto;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1")
public class UserController {

    @GetMapping("/profile/{user-id}")
    public void getUserProfile(@PathVariable("user-id") Long userId) {

    }

    @GetMapping("/setting/{user-id}")
    public void getUserSetting(@PathVariable("user-id") Long userId) {

    }

    @PostMapping("/user")
    public void createUser(UserDto userDto) {

    }

    @PatchMapping("/user/profile/edit/name/{user-id}")
    public void updateUserProfileName(@PathVariable("user-id") Long userId,
        @RequestBody UserProfileDto.PostName userProfileDto) {

    }

    @PatchMapping("/user/profile/edit/picture/{user-id}")
    public void updateUserProfilePicture(@PathVariable("user-id") Long userId,
        @RequestBody UserProfileDto.PostPicture userProfileDto) {

    }

    @PatchMapping("/user/setting/edit/language/{user-id}")
    public void updateUserSettingLanguage(@PathVariable("user-id") Long userId, String language) {

    }

    @PatchMapping("/user/setting/edit/country/{user-id}")
    public void updateUserSettingCountry(@PathVariable("user-id") Long userId, String country) {

    }

    @PatchMapping("/user/setting/edit/timezone/{user-id}")
    public void updateUserSettingTimeZone(@PathVariable("user-id") Long userId, String timeZone) {

    }

    @DeleteMapping("/user/{user-id}")
    public void deleteUser(@PathVariable("user-id") Long userId) {

    }
}
