package com.example.simplevectorstore_demo.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class AppController {
    ChatClient chatClient;

    public AppController(ChatClient.Builder chatClientBuilder, VectorStore vectorStore) {
        this.chatClient = chatClientBuilder
                .defaultAdvisors(QuestionAnswerAdvisor.builder(vectorStore).build())
                .build();
    }

    @GetMapping("/newproducts")
    public String getResponse(@RequestParam(defaultValue = "Tell me about all the products") String query) {
        String prompt = "Give me information about new product : " + query;
        System.out.println(prompt);

        return Objects.requireNonNull(chatClient.prompt().user(prompt)
                .call()
                .chatResponse().getResult().getOutput().getText()
        );
    }


}
