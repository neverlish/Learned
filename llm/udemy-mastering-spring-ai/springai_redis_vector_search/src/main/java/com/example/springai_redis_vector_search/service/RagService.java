package com.example.springai_redis_vector_search.service;

import com.example.springai_redis_vector_search.model.ChatResponse;
import com.example.springai_redis_vector_search.model.ContextChunk;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RagService {

    private static final Logger log = LoggerFactory.getLogger(RagService.class);

    private final ChatClient chatClient;
    private final DocumentService documentService;

    private static final String SYSTEM_PROMPT = """
            You are a helpful assistant that answers questions based on the provided context.
            Use only the information from the context to answer. If you cannot find the answer
            in the context, say so clearly. Be concise and accurate.
            """;

    private static final String USER_PROMPT_TEMPLATE = """
            Context:
            {context}
            
            Question: {question}
            
            Answer based on the context above:
            """;

    public RagService(ChatClient.Builder chatClientBuilder, DocumentService documentService) {
        this.chatClient = chatClientBuilder
                .defaultSystem(SYSTEM_PROMPT)
                .build();
        this.documentService = documentService;
    }

    public ChatResponse answer(String question) {
        // Step 1: Retrieve relevant context chunks
        List<ContextChunk> contextChunks = documentService.search(question, 5);

        log.info("Retrieved {} context chunks for question: {}", contextChunks.size(), question);

        if (contextChunks.isEmpty()) {
            return new ChatResponse(
                    "No relevant documents found. Please upload some documents first.",
                    List.of(),
                    question
            );
        }

        // Step 2: Build context string
        String context = contextChunks.stream()
                .map(chunk -> "Source: " + chunk.source() + "\n" + chunk.content())
                .collect(Collectors.joining("\n\n---\n\n"));

        // Step 3: Call LLM with context + question
        String userMessage = USER_PROMPT_TEMPLATE
                .replace("{context}", context)
                .replace("{question}", question);

        String answer = chatClient.prompt()
                .user(userMessage)
                .call()
                .content();

        log.info("Generated answer for question: {}", question);

        return new ChatResponse(answer, contextChunks, question);
    }
}


