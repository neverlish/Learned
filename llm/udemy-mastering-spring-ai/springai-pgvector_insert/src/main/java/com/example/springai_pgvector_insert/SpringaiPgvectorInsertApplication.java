package com.example.springai_pgvector_insert;

import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.Resource;

import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class SpringaiPgvectorInsertApplication implements CommandLineRunner {

    @Value("classpath:input.txt")
    Resource resource;

    private final VectorStore vectorStore;

    public SpringaiPgvectorInsertApplication(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringaiPgvectorInsertApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        List<Document> documents = Files.lines(resource.getFile().toPath())
                .map(Document::new)
                .collect(Collectors.toList());

        TextSplitter textSplitter = new TokenTextSplitter();
        for(Document document : documents) {
            List<Document> splitteddocs = textSplitter.split(document);
            System.out.println("before adding document: " + document.getText());
            vectorStore.add(splitteddocs);
            System.out.println("Added document: " + document.getText());
//            Thread.sleep(61000);
        }
    }

}
