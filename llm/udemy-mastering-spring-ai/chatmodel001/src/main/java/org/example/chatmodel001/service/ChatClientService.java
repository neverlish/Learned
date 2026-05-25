package org.example.chatmodel001.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;


@Service
public class ChatClientService {

    @Autowired
    private ChatClient chatClient;

    @Autowired
    @Qualifier("antropicChatClient")
    private ChatClient anthropicChatClient;

    public void askQuestions() {
        String openAIResponse = chatClient.prompt()
                .user("Tell me two five lines about java")
                .call()
                .content();
        System.out.println("Response from OpenAI model : " + openAIResponse);

        System.out.println("----------------------");

        String anthropicResponse = anthropicChatClient.prompt()
                .user("What is the capital of France?")
                .call()
                .content();
        System.out.println("Response from Anthropic model : " + anthropicResponse);

    }
}
