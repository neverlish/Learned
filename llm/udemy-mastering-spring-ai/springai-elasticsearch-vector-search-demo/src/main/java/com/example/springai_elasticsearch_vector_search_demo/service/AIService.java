package com.example.springai_elasticsearch_vector_search_demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class AIService {

    @Autowired
    VectorStore vectorStore;

    @Value("classpath:products.json")
    Resource resource;

    private static final Logger logger = LoggerFactory.getLogger(AIService.class);

    public void loadVectors() {
        List<Document> documents = readAndPrintJsonFile();

        TextSplitter textSplitter = new TokenTextSplitter();
        for (Document document : documents) {
            List<Document> splitDocuments = textSplitter.split(document);
            logger.info("before adding document into vector store: " + document.getText());
            vectorStore.add(splitDocuments);
            logger.info("Added document to vector store: " + document.getText());

        }
    }

    public List<Document> searchVectors(String query) {
        List<Document> results = vectorStore.similaritySearch(SearchRequest.builder().query(query).topK(3).similarityThreshold(0.7).build());
        return  results;
    }

    public List<Document> readAndPrintJsonFile() {
        List<Document> documents = new ArrayList<>();
        try (InputStream inputStream = resource.getInputStream()) {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(inputStream);
            for (JsonNode node : jsonNode) {
                if (node.has("description")) {
                    System.out.println(node.get("description").toString());
                    documents.add(new Document(node.get("description").toString()));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return documents;
    }

}

