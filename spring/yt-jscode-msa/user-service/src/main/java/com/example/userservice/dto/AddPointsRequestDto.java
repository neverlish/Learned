package com.example.userservice.dto;

public class AddPointsRequestDto {
    private Long userId;
    private int amount;

    public AddPointsRequestDto(Long userId, int amount) {
        this.userId = userId;
        this.amount = amount;
    }

    public Long getUserId() {
        return userId;
    }

    public int getAmount() {
        return amount;
    }
}
