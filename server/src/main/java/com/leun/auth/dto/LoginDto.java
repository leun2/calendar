package com.leun.auth.dto;

import com.leun.user.dto.UserSettingDto;
import lombok.Getter;
import lombok.Setter;

public class LoginDto {

    @Getter
    @Setter
    public static class Request {
        private String email;
        private String password;
    }

    @Getter
    @Setter
    public static class Response {
        private String name;
        private String image;
        private UserSettingDto.Response setting;
        private String token;

        public Response(String name, String image, UserSettingDto.Response setting, String token) {
            this.name = name;
            this.image = image;
            this.setting = setting;
            this.token = token;
        }
    }
}