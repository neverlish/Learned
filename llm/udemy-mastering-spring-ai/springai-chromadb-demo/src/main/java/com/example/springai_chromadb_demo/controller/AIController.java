package com.example.springai_chromadb_demo.controller;

import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RestController
public class AIController {
    @Value("classpath:input.txt")
    Resource resource;

    VectorStore vectorStore;

    public AIController(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @GetMapping("/load")
    public String load() throws IOException, InterruptedException {
        List<Document> documents = Files.lines(resource.getFile().toPath())
                .map(Document::new)
                .toList();
        TextSplitter textSplitter = new TokenTextSplitter();
        for(Document document : documents) {
            List<Document> splitteddocs = textSplitter.split(document);
            System.out.println("before adding document: " + document.getText());
            vectorStore.add(splitteddocs);
//            Thread.sleep(61000);
            System.out.println("Added document: " + document.getText());
        }
        return "Loaded " + resource.getFilename();
    }

    @GetMapping("/search")
    public String search() {
        List<Document> results = vectorStore.similaritySearch(SearchRequest.builder().query("classic novel about wealth and society").topK(3).build());
        return results.toString();
    }
}
