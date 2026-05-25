package com.example.chatmemoryexamples;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Scanner;

@SpringBootApplication
public class ChatmemoryexamplesApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ChatmemoryexamplesApplication.class, args);
	}

    @Autowired
    private ChatClient chatClient;

    @Override
    public void run(String... args) throws Exception {
        startChat();
    }

    public void startChat() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter your message: ");
        while (true) {
            String message = scanner.nextLine();
            if (message.equals("exit")) {
                System.out.println("Goodbye!");
                break;
            }
            String response = getResponse(message);
            System.out.println("Bot: " + response);
            System.out.println("Enter your message: ");
        }
    }

    public String getResponse(String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }
}
