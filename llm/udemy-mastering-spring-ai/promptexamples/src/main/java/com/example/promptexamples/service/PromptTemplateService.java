package com.example.promptexamples.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PromptTemplateService {
    private final ChatClient chatClient;

    public PromptTemplateService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String explainTopic(String topic, String level) {
        String template = "Explain {topic} to a {level} developer in simple terms";

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Prompt prompt = promptTemplate.create(Map.of(
            "topic", topic,
            "level", level
        ));

        return chatClient.prompt(prompt).call().content();
    }

    public String generateList(String count, String type, String topic) {
        String template = "List {count} {type} for {topic}. Provide brief description";

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Prompt prompt = promptTemplate.create(Map.of(
            "count", count,
            "type", type,
            "topic", topic
        ));

        return chatClient.prompt(prompt).call().content();
    }
}
