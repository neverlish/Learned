package com.example.spring_default_system_message.controller;

import com.example.spring_default_system_message.SpringDefaultSystemMessageApplication;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    public final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(AppController.class);

    @Autowired
    ChatClient chatClient;

    @PostMapping("/api/chat")
    public String chat(@RequestBody String request) {
        logger.info("Received request to chat");
        String response = chatClient.prompt()
                .user(request)
                .call()
                .content();

        logger.info("Response from chat client: {}", response);
        return response;
    }
}
