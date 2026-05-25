package com.example.springai_pgvector_retrieval.controller;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ChatController {

    private final VectorStore vectorStore;

    public ChatController(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @GetMapping("/chat")
    public String chat() {
        List<Document> results = vectorStore.similaritySearch(SearchRequest.builder().query("smartwatch with features like fitness tracking and health monitoring").topK(10).build());
        return results.stream()
                .map(Document::getText)
                .limit(10)
                .collect(Collectors.joining(", "));
    }
}

