package com.example.secondtest.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = PageController.class)
class PageControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void get_method_테스트1() throws Exception {

        // given

        // when & then
        mockMvc.perform(get("/page"))
                .andExpect(status().isOk())
                .andExpect(view().name("page"))
                .andExpect(model().attributeExists("POSTLIST"));

    }

    @Test
    void post_method_테스트1() throws Exception {

        // given
        String title = "제목";
        String content = "내용";

        // when & then
        mockMvc.perform(post("/page")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("title", title)
                        .param("content", content))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/page"));

    }

}