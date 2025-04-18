package com.leun.auth.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class GoogleConfig {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;
}