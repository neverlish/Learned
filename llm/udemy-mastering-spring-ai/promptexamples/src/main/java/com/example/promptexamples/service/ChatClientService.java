package com.example.promptexamples.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatClientService {
    @Autowired
    private ChatClient chatClient;

    public String promptDemo1() {
        System.out.println("--- METHOD 1: Prompt from String ---");

        Prompt prompt1 = new Prompt("What is Spring Boot?");
        System.out.println("Created Prompt from String: What is Spring Boot?");
        System.out.println("Messages in Prompt: " + prompt1.getInstructions().size());

        String response1 = chatClient.prompt(prompt1).call().content();
        System.out.println("Response: " + response1.substring(0, Math.min(100, response1.length())) + "...\n");
        return "";
    }

    public String promptDemo2() {
        System.out.println("--- METHOD 2: Prompt from Single Message ---");

        UserMessage userMessage = new UserMessage("Explain microservices in one sentence");

        Prompt prompt2 = new Prompt(userMessage);

        System.out.println("Created Prompt from UserMessage");
        System.out.println("Message type: " + prompt2.getInstructions().get(0).getClass().getSimpleName());

        String response2 = chatClient.prompt(prompt2).call().content();
        System.out.println("Response: " + response2 + "\n");

        return "";
    }

    public String promptDemo3() {
        System.out.println("--- METHOD 3: Prompt from List of Messages ---");

        List<Message> messages = new ArrayList<>();
        messages.add(new SystemMessage("You are a Java expert who explains concepts clearly"));
        messages.add(new UserMessage("What is dependency injection?"));


        Prompt prompt3 = new Prompt(messages);

        System.out.println("Created Prompt with " + prompt3.getInstructions().size() + "messages:");
        System.out.println("1. SystemMessage");
        System.out.println("2. UserMessage");

        String response3 = chatClient.prompt(prompt3).call().content();
        System.out.println("Response: " + response3 + "\n");

        return "";
    }

    public String promptDemo4() {
        System.out.println("--- METHOD 4: Prompt from ChatOptions ---");

        List<Message> messages = List.of(
            new UserMessage("Write a creative haiku about programming")
        );

        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .model("gpt-3.5-turbo")
                .temperature(0.9)
                .maxTokens(100)
                .build();

        Prompt prompt4 = new Prompt(messages, options);

        System.out.println("Created Prompt with ChatOptions");


        ChatResponse response4 = chatClient.prompt(prompt4).call().chatResponse();
        System.out.println("Response: " + response4.getResult().getOutput().getText() + "\n");
        System.out.println("Token Used: " + response4.getMetadata().getUsage().getTotalTokens());


        return "";
    }

    public String promptDemo5(ChatModel chatModel) {
        System.out.println("--- METHOD 5: Prompt from ChatOptions ---");

        List<Message> messages = List.of(
                new UserMessage("Write a creative haiku about programming")
        );

        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .model("gpt-3.5-turbo")
                .temperature(0.9)
                .maxTokens(100)
                .build();

        Prompt prompt4 = new Prompt(messages, options);

        System.out.println("Created Prompt with ChatOptions");

        ChatResponse response4 = chatClient.prompt(prompt4).call().chatResponse();

        Prompt prompt = new Prompt("hello");

        ChatResponse response = chatModel.call(prompt);

        System.out.println("Response: " + response4.getResult().getOutput().getText() + "\n");
        System.out.println("Token Used: " + response4.getMetadata().getUsage().getTotalTokens());


        return "";
    }
}
