package com.example.springboot_structured_output_demo.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.ListOutputConverter;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

@RestController
public class AIController {
    ChatClient chatClient;

    public AIController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @GetMapping("/chat")
    public String getResponse(@RequestParam(value = "message", defaultValue = "give me the names of top five cities in US?") String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .chatResponse().getResult().getOutput().getText();
    }

    @GetMapping("/chatlist")
    public List<String> getResponseAsList(@RequestParam(value = "message", defaultValue = "give me the names of top five cities in US?") String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .entity(new ListOutputConverter(new DefaultConversionService()));
    }

    @GetMapping("/chatmap")
    public Map<String, String> getResponseAsMap(@RequestParam(value = "message", defaultValue = "give me the names of 5 country and their capitals into map?") String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .entity(new ParameterizedTypeReference<Map<String, String>>() {

                });
    }
}
