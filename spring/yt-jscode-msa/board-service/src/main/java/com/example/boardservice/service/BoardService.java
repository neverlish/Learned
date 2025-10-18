package com.example.boardservice.service;

import com.example.boardservice.client.UserClient;
import com.example.boardservice.domain.Board;
import com.example.boardservice.domain.BoardRepository;
import com.example.boardservice.dto.BoardResponseDto;
import com.example.boardservice.dto.CreateBoardRequestDto;
import com.example.boardservice.dto.UserDto;
import com.example.boardservice.dto.UserResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserClient userClient;

    public BoardService(BoardRepository boardRepository, UserClient userClient) {
        this.boardRepository = boardRepository;
        this.userClient = userClient;
    }

    @Transactional
    public void create(CreateBoardRequestDto createBoardRequestDto) {
        Board board = new Board(
            createBoardRequestDto.getTitle(),
            createBoardRequestDto.getContent(),
            createBoardRequestDto.getUserId()
        );

        this.boardRepository.save(board);
    }

    public BoardResponseDto getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        UserResponseDto userResponseDto = userClient.fetchUser(board.getUserId());

        UserDto userDto = new UserDto(
            userResponseDto.getUserId(),
            userResponseDto.getName()
        );

        BoardResponseDto boardResponseDto = new BoardResponseDto(
            board.getBoardId(),
            board.getTitle(),
            board.getContent(),
            userDto
        );

        return boardResponseDto;


    }
}
