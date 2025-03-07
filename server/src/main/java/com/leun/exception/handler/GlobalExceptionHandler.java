package com.leun.exception.handler;

import com.leun.exception.Response.ErrorResponse;
import com.leun.exception.UnauthorizedAccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @ExceptionHandler(UnauthorizedAccessException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED) // HTTP 404 상태 코드 반환
    @ResponseBody
    public ErrorResponse UnauthorizedAccessException(UnauthorizedAccessException e) {
        return new ErrorResponse("UNAUTHORIZED_ACCESS", e.getMessage());
    }

}
