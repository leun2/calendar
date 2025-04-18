package com.leun.auth.controller;

import com.leun.auth.dto.LoginDto;
import com.leun.auth.dto.LoginDto.Response;
import com.leun.auth.service.GoogleAuthService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth/google")
@RequiredArgsConstructor
public class GoogleAuthController {

    private final GoogleAuthService googleAuthService;

    @PostMapping("/login")
    public ResponseEntity<Response> googleLogin(@RequestBody GoogleLoginRequest request) throws Exception {
        LoginDto.Response response = googleAuthService.googleLogin(request.getCredential());
        return ResponseEntity.ok(response);
    }

    @Getter
    @Setter
    public static class GoogleLoginRequest {
        private String credential;
    }
}
