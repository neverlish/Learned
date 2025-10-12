package com.example.secondtest.api;

import com.example.secondtest.domain.post.dto.PostRequestDTO;
import com.example.secondtest.domain.post.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = PostController.class)
class PostControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    PostService postService;

    @Test
    void post_method_테스트1() throws Exception {

        // given
        PostRequestDTO requestDTO = new PostRequestDTO();
        requestDTO.setTitle("제목");
        requestDTO.setContent("내용");

        // when & then
        mockMvc.perform(post("/post")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

    }

    @Test
    void post_method_테스트2() throws Exception {

        // given
        PostRequestDTO requestDTO = new PostRequestDTO();
        requestDTO.setTitle("제목");
        requestDTO.setContent("내용");

        given(postService.create(any(PostRequestDTO.class))).willReturn(1L);

        // when & then
        mockMvc.perform(post("/post")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1));

        verify(postService).create(any(PostRequestDTO.class));
    }

    @Test
    void post_method_테스트3() throws Exception {

        // given
        PostRequestDTO requestDTO = new PostRequestDTO();
        requestDTO.setTitle("");
        requestDTO.setContent("내용");

        given(postService.create(any(PostRequestDTO.class))).willThrow(new IllegalArgumentException());

        // when & then
        mockMvc.perform(post("/post")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

    }

}