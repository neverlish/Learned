package com.example.openai_api_demo.service;

import com.example.openai_api_demo.model.Answer;
import com.example.openai_api_demo.model.Question;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeGeneratorService implements RecipeGenerator {
    @Autowired
    private ChatClient chatClient;

    @Override
    public Answer generateRecipe(Question question) {
        return new Answer(getRecipe(question.getQuestion()).getResult().getOutput().getText());
    }

    public ChatResponse getRecipe(String question) {
        return chatClient.prompt()
                .user(question)
                .call()
                .chatResponse();
    }
}
