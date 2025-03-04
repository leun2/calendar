package com.leun.user.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class UserProfileDto {

    @Getter
    @Setter
    public static class Get {
        private String name;
        private MultipartFile picture;
    }

    @Getter
    @Setter
    public static class PostName {
        private String name;
    }

    @Getter
    @Setter
    public static class PostPicture {
        private  MultipartFile picture;
    }
}
