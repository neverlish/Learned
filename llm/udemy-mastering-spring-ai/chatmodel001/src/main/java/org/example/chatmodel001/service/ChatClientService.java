package org.example.chatmodel001.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.metadata.ChatResponseMetadata;
import org.springframework.ai.chat.metadata.Usage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ChatClientService {

    @Autowired
    private ChatClient chatClient;

    public String askQuestion(String userInput) {
        System.out.println("ChatResponse ");
        ChatResponse chatResponse = chatClient.prompt()
                .user(userInput)
                .call()
                .chatResponse();
        System.out.println("ChatResponse: " + chatResponse);
        String text = chatResponse.getResult().getOutput().getText();
        System.out.println("Actual Response Text: " + text);
        return text;

    }

    public String getGenerationAndMetadata(String userInput) {
        ChatResponse chatResponse = chatClient.prompt()
                .user(userInput)
                .call()
                .chatResponse();

        Generation result = chatResponse.getResult();
        System.out.println("Generation Object: " + result.getClass().getSimpleName());

        String text = result.getOutput().getText();
        System.out.println("Generated Text:" + text);

        String finishReason = result.getMetadata().getFinishReason();
        System.out.println("Finish Reason: " + finishReason);

        ChatResponseMetadata metadata = chatResponse.getMetadata();
        System.out.println("Metadata Object: " + metadata.getClass().getSimpleName());

        String model = metadata.getModel();
        System.out.println("Model Used: " + model);

        var rateLimit = metadata.getRateLimit();

        if (rateLimit != null) {
            System.out.println("rate limit is available");
            System.out.println("Request remaining for this minute: " + rateLimit.getRequestsRemaining());
            System.out.println("Tokens remaining for this minute: " + rateLimit.getTokensRemaining());
        } else {
            System.out.println("rate limit is not available");
        }

        return text;
    }

    public String usageStatistics(String userInput) {
        ChatResponse chatResponse = chatClient.prompt()
                .user(userInput)
                .call()
                .chatResponse();

        Usage usage = chatResponse.getMetadata().getUsage();

        if (usage != null) {
            System.out.println("Usage Object: " + usage.getClass().getSimpleName());
            System.out.println("Prompt Tokens Used: " + usage.getPromptTokens());
            System.out.println("Completion Tokens Used: " + usage.getCompletionTokens());
            System.out.println("Total Tokens Used: " + usage.getTotalTokens());
            return "Prompt Tokens : " + usage.getPromptTokens() +
                    ", Completion Tokens: " + usage.getCompletionTokens() +
                    ", Total Tokens: " + usage.getTotalTokens();
        } else {
            System.out.println("Usage information is not available in the response metadata");
            return "Usage information is not available";
        }
    }

    public String multipleVariations() {
        System.out.println("Multiple Variations");
        ChatResponse chatResponse = chatClient.prompt()
                .options(OpenAiChatOptions.builder()
                        .maxTokens(100)
                        .N(3)
                        .temperature(0.9)
                        .build())
                .user("Suggest a creative name for a clud-based task management app")
                .call()
                .chatResponse();

        List<Generation> generations = chatResponse.getResults();

        for (int i = 0; i < generations.size(); i++) {
            Generation gen = generations.get(i);
            String text = gen.getOutput().getText();
            String finishReason = gen.getMetadata().getFinishReason();

            System.out.println("--------------------");
            System.out.println("Option " + (i+1) + ":");
            System.out.println("--------------------");
            System.out.println(text);
            System.out.println("Finish Reason: " + finishReason);
            System.out.println();
        }

        return "Multiple Variations print on console";
    }


}
