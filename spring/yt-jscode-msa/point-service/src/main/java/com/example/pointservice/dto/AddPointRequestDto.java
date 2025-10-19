package com.example.pointservice.dto;

public class AddPointRequestDto {
    private Long userId;
    private int amount;

    public Long getUserId() {
        return userId;
    }

    public int getAmount() {
        return amount;
    }
}
