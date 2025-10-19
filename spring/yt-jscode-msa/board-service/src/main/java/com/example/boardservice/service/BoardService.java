package com.example.boardservice.service;

import com.example.boardservice.client.PointClient;
import com.example.boardservice.client.UserClient;
import com.example.boardservice.domain.Board;
import com.example.boardservice.domain.BoardRepository;
import com.example.boardservice.dto.BoardResponseDto;
import com.example.boardservice.dto.CreateBoardRequestDto;
import com.example.boardservice.dto.UserDto;
import com.example.boardservice.dto.UserResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserClient userClient;
    private final PointClient pointClient;

    public BoardService(BoardRepository boardRepository, UserClient userClient, PointClient pointClient) {
        this.boardRepository = boardRepository;
        this.userClient = userClient;
        this.pointClient = pointClient;
    }

    @Transactional
    public void create(CreateBoardRequestDto createBoardRequestDto) {
        pointClient.deductPoints(createBoardRequestDto.getUserId(), 100);

        Board board = new Board(
            createBoardRequestDto.getTitle(),
            createBoardRequestDto.getContent(),
            createBoardRequestDto.getUserId()
        );

        this.boardRepository.save(board);

        userClient.addActivityScore(createBoardRequestDto.getUserId(), 10);
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

    public List<BoardResponseDto> getBoards() {
        List<Board> boards = boardRepository.findAll();

        List<Long> userIds = boards.stream()
                .map(Board::getUserId)
                .distinct()
                .toList();

        List<UserResponseDto> userResponseDtos = userClient.fetchUsersByIds(userIds);

        Map<Long, UserDto> userMap = new HashMap<>();

        for (UserResponseDto userResponseDto: userResponseDtos) {
            Long userId = userResponseDto.getUserId();
            String name = userResponseDto.getName();

            userMap.put(userId, new UserDto(userId, name));
        }

        return boards.stream()
            .map(board -> new BoardResponseDto(
                board.getBoardId(),
                board.getTitle(),
                board.getContent(),
                userMap.get(board.getUserId())
            ))
            .toList();
    }
}
