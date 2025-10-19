package com.example.userservice.dto;

public class AddActivityScoreRequestDto {
    private Long userId;
    private int score ;

    public Long getUserId() {
        return userId;
    }

    public int getScore() {
        return score;
    }
}
