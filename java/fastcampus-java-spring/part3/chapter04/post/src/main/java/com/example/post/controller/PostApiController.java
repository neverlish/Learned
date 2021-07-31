package com.example.post.controller;

import com.example.post.dto.PostRequsetDto;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PostApiController {
    @PostMapping("/post")
    public void post(@RequestBody PostRequsetDto requestData) {
        System.out.println(requestData);
    }
}
