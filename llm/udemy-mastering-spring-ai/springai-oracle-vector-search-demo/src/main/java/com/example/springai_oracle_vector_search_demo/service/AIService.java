package com.example.springai_oracle_vector_search_demo.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AIService {
    @Autowired
    VectorStore vectorStore;

    public List<Document> loaddata() {
        List<Document> documents = List.of(
                new Document("Spring AI rocks!! Spring AI rocks!! Spring AI rocks!! Spring AI rocks!! Spring AI rocks!!", Map.of("country", "UK", "year", 2020)),
                new Document("The World is Big and Salvation Lurks Around the Corner", Map.of("country", "BG", "year", 2018)),
                new Document("You walk forward facing the past and you turn back toward the future.", Map.of("country", "NL", "year", 2023)),
                new Document("Exploring the depths of the ocean is like diving into a new world of wonder.", Map.of("country", "USA", "year", 2019)),
                new Document("Technology shapes the future but leaves our past behind.", Map.of("category", "Technology")),
                new Document("The evolution of artificial intelligence is transforming industries.", Map.of("category", "Technology", "year", 2021)),
                new Document("Mountains are the beginning and the end of all natural scenery.", Map.of("country", "CH", "year", 2022)),
                new Document("Books are a uniquely portable magic.", Map.of("author", "Stephen King", "genre", "Literature")),
                new Document("The stars are not afraid of the darkness; they only shine brighter.", Map.of("country", "AU", "year", 2021))
        );
        TextSplitter textSplitter = new TokenTextSplitter();

        for (Document document : documents) {
            List<Document> splitteddocs = textSplitter.split(document);

            vectorStore.add(splitteddocs);
            System.out.println("Added document: " + document.getText());
        }
        System.out.println("Transformed documents: " + documents);
        return documents;
    }

    public List<Document> search(String query) {
        List<Document> results = vectorStore.similaritySearch(SearchRequest.builder().query(query).topK(3).similarityThreshold(0.7).build());
        return results;
    }
}
