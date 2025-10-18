package com.example.boardservice.dto;

public class BoardResponseDto {
    private Long boardId;
    private String title;
    private String content;
    private UserDto user;

    public BoardResponseDto(Long boardId, String title, String content, UserDto user) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
        this.user = user;
    }

    public Long getBoardId() {
        return boardId;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public UserDto getUser() {
        return user;
    }
}
