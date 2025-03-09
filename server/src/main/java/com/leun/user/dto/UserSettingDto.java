package com.leun.user.dto;

import lombok.Getter;
import lombok.Setter;

public class UserSettingDto {

    @Getter
    @Setter
    public static class Response {
        private String language;
        private String country;
        private String timezone;

        public Response(String language, String country, String timezone) {
            this.language = language;
            this.country = country;
            this.timezone = timezone;
        }
    }

    public static class Request {

        @Getter
        @Setter
        public static class Language {
            private String language;
        }

        @Getter
        @Setter
        public static class Country {
            private String country;
        }

        @Getter
        @Setter
        public static class Timezone {
            private String timezone;
        }
    }
}
