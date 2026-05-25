package com.example.springai_chat_memory_mysql.controller;


import com.example.springai_chat_memory_mysql.service.ChatService;
import org.springframework.ai.chat.messages.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/send")
    public String chat(@RequestBody String request) {
        return chatService.chat(request);
    }

    @GetMapping("/sessions")
    public List<Message> listAllChats() {
        return chatService.listAllChats();
    }
}

