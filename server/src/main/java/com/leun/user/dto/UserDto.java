package com.leun.user.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

public class UserDto {

    @Getter
    @Setter
    public static class Request {

        @Email
        private String email;
        private String password;
        private String name;
    }
}
