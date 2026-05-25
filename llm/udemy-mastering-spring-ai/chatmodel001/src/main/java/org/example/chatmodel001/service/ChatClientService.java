package org.example.chatmodel001.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ChatClientService {

    @Autowired
    private ChatClient chatClient;

    public String askQuestion(String userInput) {
        System.out.println("ChatResponse ");
        ChatResponse chatResponse = chatClient.prompt()
                .user(userInput)
                .call()
                .chatResponse();
        System.out.println("ChatResponse: " + chatResponse);
        String text = chatResponse.getResult().getOutput().getText();
        System.out.println("Actual Response Text: " + text);
        return text;

    }


}
