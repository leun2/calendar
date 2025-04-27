package com.leun.auth.dto;

import lombok.Getter;
import lombok.Setter;

public class OAuthDto {

    @Getter
    @Setter
    public static class GoogleRequest {
        private String code;
    }
}
