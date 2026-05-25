package org.example.chatmodel001.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.metadata.ChatResponseMetadata;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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


}
