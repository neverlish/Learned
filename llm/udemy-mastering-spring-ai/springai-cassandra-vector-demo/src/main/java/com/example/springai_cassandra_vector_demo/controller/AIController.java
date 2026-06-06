package com.example.springai_cassandra_vector_demo.controller;

import com.example.springai_cassandra_vector_demo.service.AICassandraVectorService;
import org.springframework.ai.document.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AIController {
    @Autowired
    AICassandraVectorService aicassandraVectorService;

    @GetMapping("/load")
    public void loadDocuments() {
        aicassandraVectorService.getDocuments();
    }

    @GetMapping("/search")
    public List<Document> searchDocuments() {
        return aicassandraVectorService.searchDocuments("Technology");
    }
}
