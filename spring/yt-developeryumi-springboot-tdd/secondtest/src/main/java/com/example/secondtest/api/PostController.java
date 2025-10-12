package com.example.secondtest.api;

import com.example.secondtest.domain.post.dto.PostRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;

import com.example.secondtest.domain.post.service.PostService;

import java.util.Map;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/post")
    public ResponseEntity<?> postMethod(
        @RequestBody PostRequestDTO dto
    ) {

        Long resultId = postService.create(dto);

        // HTTP body
        Map<String, Object> responseBody = Map.of("id", resultId);

        //HTTP header
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application", "json"));

        return new ResponseEntity<>(responseBody, httpHeaders, HttpStatus.OK);
    }
}