package org.example.chatmodel001.controller;

import org.example.chatmodel001.service.ChatClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    @Autowired
    ChatClientService chatClientService;

    @GetMapping("/ask/{userInput}")
    public String ask(@PathVariable String userInput) {
        return chatClientService.askQuestion(userInput);
    }
}
