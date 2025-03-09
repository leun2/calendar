package com.leun.user.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class UserProfileDto {

    @Getter
    @Setter
    public static class Response {
        private String name;
        private String image;

        public Response(String name, String image) {
            this.name = name;
            this.image = image;
        }
    }

    public static class Request {

        @Getter
        @Setter
        public static class Name {
            private String name;
        }

        @Getter
        @Setter
        public static class Image {
            private  MultipartFile image;
        }

    }
}
