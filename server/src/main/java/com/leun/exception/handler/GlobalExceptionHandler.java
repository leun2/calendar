package com.leun.exception.handler;

import com.leun.exception.InvalidDateException;
import com.leun.exception.Response.ErrorResponse;
import com.leun.exception.UnauthorizedAccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @ExceptionHandler(UnauthorizedAccessException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorResponse UnauthorizedAccessException(UnauthorizedAccessException e) {
        return new ErrorResponse("Unauthorized Access", e.getMessage());
    }

    @ExceptionHandler(InvalidDateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorResponse InvalidDateException(InvalidDateException e) {
        return new ErrorResponse("Invalid Date", e.getMessage());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleHttpMessageNotReadable(HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().body("요청 형식이 잘못되었습니다: " + e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        // 400 Bad Request로 응답을 반환
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청입니다: " + e.getMessage());
    }

    @ExceptionHandler(EnumConstantNotPresentException.class)
    public ResponseEntity<String> handleEnumException(EnumConstantNotPresentException e) {
        // 400 Bad Request로 응답을 반환
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 색상 값입니다: " + e.getMessage());
    }
}
