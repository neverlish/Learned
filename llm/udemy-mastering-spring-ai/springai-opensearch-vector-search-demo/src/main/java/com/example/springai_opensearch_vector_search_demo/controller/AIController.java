package com.example.springai_opensearch_vector_search_demo.controller;

import com.example.springai_opensearch_vector_search_demo.service.AIService;
import org.springframework.ai.document.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AIController {

    @Autowired
    private AIService aiService;

    @GetMapping("/load")
    public String loadVectors() {
        aiService.loadVectors();
        return "Loaded vectors for opensearch";
    }

    @GetMapping("/search")
    public List<String> search(@RequestParam(defaultValue = "default query") String query) {
        List<Document> docs = aiService.searchVectors(query);
        List<String> docContents = docs.stream()
                .map(Document::getText)
                .collect(Collectors.toList());
        return docContents;
    }
}

