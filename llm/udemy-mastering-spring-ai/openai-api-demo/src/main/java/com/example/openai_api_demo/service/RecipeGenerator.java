package com.example.openai_api_demo.service;

import com.example.openai_api_demo.model.Answer;
import com.example.openai_api_demo.model.Question;
import org.springframework.stereotype.Service;

@Service
public interface RecipeGenerator {
    public Answer generateRecipe(Question question);
}
