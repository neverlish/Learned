package com.example.promptexamples.controller;

import com.example.promptexamples.service.ChatClientService;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    @Autowired
    ChatClientService chatClientService;

    @Autowired
    ChatModel chatModel;

    @GetMapping("/promptdemo")
    public String promptdemo() {
        return chatClientService.promptDemo5(chatModel);
    }
}
