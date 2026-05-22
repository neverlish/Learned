package com.example.demospringaiquickstart.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    ChatClient chatClient;

    public ChatService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String getChatResponse(String prompt) {
        return chatClient
                .prompt(prompt)
                .call()
                .chatResponse()
                .getResult()
                .getOutput()
                .getText();
    }
}
