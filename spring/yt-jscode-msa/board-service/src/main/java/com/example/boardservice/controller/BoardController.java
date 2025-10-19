package com.example.boardservice.controller;

import com.example.boardservice.dto.BoardResponseDto;
import com.example.boardservice.dto.CreateBoardRequestDto;
import com.example.boardservice.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
public class BoardController {
    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping
    public ResponseEntity<Void> craete(
        @RequestBody CreateBoardRequestDto createBoardRequestDto
    ) {
        boardService.create(createBoardRequestDto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<BoardResponseDto> getBoard(@PathVariable Long boardId) {
        BoardResponseDto boardResponseDto = boardService.getBoard(boardId);
        return ResponseEntity.ok(boardResponseDto);
    }

    @GetMapping()
    public ResponseEntity<List<BoardResponseDto>> getBoards() {
        List<BoardResponseDto> boardResponseDtos = boardService.getBoards();
        return ResponseEntity.ok(boardResponseDtos);
    }
}
