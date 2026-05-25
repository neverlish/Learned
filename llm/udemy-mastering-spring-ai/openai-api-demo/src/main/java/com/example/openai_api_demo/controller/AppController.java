package com.example.openai_api_demo.controller;

import com.example.openai_api_demo.model.Question;
import com.example.openai_api_demo.service.RecipeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    @Autowired
    private RecipeGenerator recipeGenerator;

    @GetMapping("/generate-recipe")
    public String generateRecipe(@RequestParam(value = "question", defaultValue = "Give me a simple Recipe for any food") String question) {
        return recipeGenerator.generateRecipe(new Question(question)).getAnswer();
    }
}
