package com.leun.auth.controller;

import com.leun.auth.dto.LoginDto;
import com.leun.auth.dto.LoginDto.Response;
import com.leun.auth.dto.OAuthDto;
import com.leun.auth.service.OAuthService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService OAuthService;

    @PostMapping("/google/login")
    // 클라이언트로부터 인증 코드(code)를 담은 요청을 받습니다.
    public ResponseEntity<Response> googleLogin(@RequestBody OAuthDto.GoogleRequest request) throws Exception {
        // GoogleLoginRequest DTO에서 인증 코드를 추출합니다.
        String authCode = request.getCode();
        if (authCode == null || authCode.isEmpty()) {
            // 코드가 누락된 경우 Bad Request 응답
            return ResponseEntity.badRequest().build(); // 또는 에러 메시지를 포함
        }

        // 서비스 레이어에 인증 코드를 전달하여 로그인 처리를 위임합니다.
        // 서비스 메소드 이름도 변경될 수 있습니다.
        LoginDto.Response response = OAuthService.googleLoginWithAuthCode(authCode);
        return ResponseEntity.ok(response);
    }
}
