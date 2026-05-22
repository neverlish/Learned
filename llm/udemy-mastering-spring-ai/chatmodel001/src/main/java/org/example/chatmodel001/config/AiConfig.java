package org.example.chatmodel001.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class AiConfig {
    @Primary
    @Bean
    public ChatClient openAIChatClient(@Qualifier("openAiChatModel") ChatModel openAiChatModel) {
        ChatClient chatClient = ChatClient.create(openAiChatModel);
        System.out.println("Created ChatClient:" + chatClient);
        System.out.println("Using ChatModel: " + openAiChatModel);
        return chatClient;
    }

    @Bean
    public ChatClient antropicChatClient(@Qualifier("anthropicChatModel") ChatModel antropicChatModel) {
        ChatClient chatClient = ChatClient.create(antropicChatModel);
        System.out.println("Created ChatClient:" + chatClient);
        System.out.println("Using ChatModel: " + antropicChatModel);
        return chatClient;
    }
}
