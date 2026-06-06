package com.example.springai_typesense_vector_search_demo.controller;

import com.example.springai_typesense_vector_search_demo.service.AIService;
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
    public String load() {
        aiService.loaddata();
        return "oracle vector documents loaded successfully";
    }

    @GetMapping("/search")
    public List<String> search(@RequestParam("query") String query) {
        List<Document> results = aiService.search(query);
        List<String> contents = results.stream()
                .map(Document::getText)
                .collect(Collectors.toList());
        return contents;
    }
}

