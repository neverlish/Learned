package com.example.simplevectorstore_demo.config;

import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.reader.TextReader;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.File;
import java.util.List;

@Configuration
public class AppConfig {
    @Value("classpath:newproducts.txt")
    private Resource resource;

    @Bean
    public SimpleVectorStore simpleVectorStore(EmbeddingModel embeddingModel) {
        SimpleVectorStore simpleVectorStore = SimpleVectorStore.builder(embeddingModel)
                .build();

        File file = new File("src/main/resources/newproducts.json");

        if (file.exists()) {
            System.out.println("file exists");
            simpleVectorStore.load(file);
        } else {
            TextReader textReader = new TextReader(resource);
            textReader.getCustomMetadata().put("filename", "newproducts.txt");

            List<Document> documents = textReader.read();
            TextSplitter textSplitter = new TokenTextSplitter();
            List<Document> splitDocuments = textSplitter.split(documents);

            simpleVectorStore.add(splitDocuments);
            simpleVectorStore.save(file);
        }

        return simpleVectorStore;
    }
}
