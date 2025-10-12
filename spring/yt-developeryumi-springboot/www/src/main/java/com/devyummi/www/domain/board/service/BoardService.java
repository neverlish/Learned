package com.devyummi.www.domain.board.service;

import com.devyummi.www.domain.board.dto.BoardRequestDTO;
import com.devyummi.www.domain.board.dto.BoardResponseDTO;
import com.devyummi.www.domain.board.entity.BoardEntity;
import com.devyummi.www.domain.board.repository.BoardRepository;
import com.devyummi.www.domain.user.entity.UserEntity;
import com.devyummi.www.domain.user.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardService(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    // 유저 접근 권한 체크
    public Boolean isAccess(Long id) {

        // 현재 로그인 되어 있는 유저의 username
        String sessionUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        // 현재 로그인 되어 있는 유저의 role
        String sessionRole = SecurityContextHolder.getContext().getAuthentication().getAuthorities().iterator().next().getAuthority();

        // 수직적으로 ADMIN이면 무조건 접근 가능
        if ("ROLE_ADMIN".equals(sessionRole)) {
            return true;
        }

        // 특정 게시글 id에 대해 본인이 작성 했는지 확인
        String boardUsername = boardRepository.findById(id).orElseThrow().getUserEntity().getUsername();
        if (sessionUsername.equals(boardUsername)) {
            return true;
        }

        // 나머지 다 불가
        return false;
    }

    // 게시글 생성
    @Transactional
    public void createOneBoard(BoardRequestDTO dto) {

        // 게시글 dto -> entity
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setTitle(dto.getTitle());
        boardEntity.setContent(dto.getContent());

        // entity 저장
        boardRepository.save(boardEntity);

        //
        //User 와 Board 연관 관계 생성

        // 현재 게시글을 작성하는 유저
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // 해당 유저의 Entity 가져오기
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow();

        // 연관 관계 만드는 메소드 호출
        userEntity.addBoardEntity(boardEntity);
        userRepository.save(userEntity);
    }

    // 게시글 하나 읽기
    @Transactional(readOnly = true)
    public BoardResponseDTO readOneBoard(Long id) {

        BoardEntity boardEntity = boardRepository.findById(id).orElseThrow();

        BoardResponseDTO dto = new BoardResponseDTO();
        dto.setId(boardEntity.getId());
        dto.setTitle(boardEntity.getTitle());
        dto.setContent(boardEntity.getContent());

        return dto;
    }

    // 게시글 모두 읽기
    @Transactional(readOnly = true)
    public List<BoardResponseDTO> readAllBoards() {

        List<BoardEntity> list = boardRepository.findAll();

        List<BoardResponseDTO> dtos = new ArrayList<>();
        for (BoardEntity boardEntity : list) {
            BoardResponseDTO dto = new BoardResponseDTO();
            dto.setId(boardEntity.getId());
            dto.setTitle(boardEntity.getTitle());
            dto.setContent(boardEntity.getContent());

            dtos.add(dto);
        }

        return dtos;
    }

    // 게시글 하나 수정
    @Transactional
    public void updateOneBoard(Long id, BoardRequestDTO dto) {

        // 기존의 id에 대한 게시글 데이터 불러오기
        BoardEntity boardEntity = boardRepository.findById(id).orElseThrow();

        // 게시글 dto -> entity
        boardEntity.setTitle(dto.getTitle());
        boardEntity.setContent(dto.getContent());

        boardRepository.save(boardEntity);
    }

    // 게시글 하나 삭제
    @Transactional
    public void deleteOneBoard(Long id) {

        boardRepository.deleteById(id);
    }
}

