package com.example.mvc.advice

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.lang.RuntimeException

//@RestControllerAdvice
class GlobalControllerAdvice {
    @ExceptionHandler(value = [RuntimeException::class])
    fun exception(e: RuntimeException): String {
        return "Server Error"
    }

    @ExceptionHandler(value = [IndexOutOfBoundsException::class])
    fun indexOutOfBoundException(e: IndexOutOfBoundsException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Index Error")
    }
}