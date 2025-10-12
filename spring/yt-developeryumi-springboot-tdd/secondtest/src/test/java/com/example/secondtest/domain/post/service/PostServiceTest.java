package com.example.secondtest.domain.post.service;

import com.example.secondtest.domain.post.dto.PostRequestDTO;
import com.example.secondtest.domain.post.entity.PostEntity;
import com.example.secondtest.domain.post.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @InjectMocks
    PostService postService;

    @Mock
    PostRepository postRepository;

    @Test
    void create_테스트1() {

        // given
        PostRequestDTO requestDTO = new PostRequestDTO();
        requestDTO.setTitle("제목1");
        requestDTO.setContent("내용1");

        // when
        Long resultId = postService.create(requestDTO);

        // then
        assertTrue(resultId instanceof Long);

    }

    @Test
    void create_테스트2() {

        // given
        PostRequestDTO requestDTO = new PostRequestDTO();
        requestDTO.setTitle("제목2");
        requestDTO.setContent("내용2");

        PostEntity saved = new PostEntity();
        ReflectionTestUtils.setField(saved, "id", 1L);
        saved.setTitle("제목");
        saved.setContent("내용");
        given(postRepository.save(any(PostEntity.class))).willReturn(saved);

        // when
        postService.create(requestDTO);

        // then
        verify(postRepository).save(any(PostEntity.class));

    }

    @Test
    void create_테스트3() {

        // given
        PostRequestDTO requestDTO = new PostRequestDTO();
        requestDTO.setTitle("");
        requestDTO.setContent("내용");

        // when & then
        assertThrows(IllegalArgumentException.class, () -> {
            postService.create(requestDTO);
        });
    }


}