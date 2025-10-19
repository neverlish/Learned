package com.example.boardservice.dto;

public class AddActivityScoreRequestDto {
    private Long userId;
    private int score;

    public AddActivityScoreRequestDto(Long userId, int score) {
        this.userId = userId;
        this.score = score;
    }

    public Long getUserId() {
        return userId;
    }

    public int getScore() {
        return score;
    }
}
