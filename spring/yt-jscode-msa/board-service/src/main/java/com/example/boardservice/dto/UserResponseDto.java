package com.example.boardservice.dto;

public class UserResponseDto {
    private Long userId;
    private String email;
    private String name;

    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }
}
