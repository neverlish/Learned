package com.example.boardservice.dto;

public class CreateBoardRequestDto {
    private String title;
    private String content;
    private Long userId;

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Long getUserId() {
        return userId;
    }
}
