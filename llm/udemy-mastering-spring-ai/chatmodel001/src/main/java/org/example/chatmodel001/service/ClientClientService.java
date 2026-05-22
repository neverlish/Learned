package org.example.chatmodel001.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;


@Service
public class ClientClientService {
//    @Bean
    public ChatClient openAIChatClient(ChatModel openAiChatModel) {
        ChatClient chatClient = ChatClient.create(openAiChatModel);
        System.out.println("Created ChatClient:" + chatClient);
        System.out.println("Using ChatModel: " + openAiChatModel);
        return chatClient;
    }

}
