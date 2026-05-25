package com.example.springai_mongodb_vector_demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RestController
public class AIController {

    private final VectorStore vectorStore;

    private static final Logger logger = LoggerFactory.getLogger(AIController.class);

    public AIController(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @Value("classpath:data.txt")
    Resource resource;

    @GetMapping("/load")
    public String load() throws IOException {

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            List<Document> docs = reader.lines()
                    .map(line -> new Document(line))
                    .collect(Collectors.toList());

            logger.info("Loaded documents: {}", docs);

       /* List<Document> docs = List.of(
                new Document("Proper tuber planting involves site selection, timing, and care. Choose well-drained soil and adequate sun exposure. Plant in spring, with eyes facing upward at a depth two to three times the tuber's height. Ensure 4-12 inch spacing based on tuber size. Adequate moisture is needed, but avoid overwatering. Mulching helps preserve moisture and prevent weeds.", Map.of("author", "A", "type", "post")),
                new Document("Successful oil painting requires patience, proper equipment, and technique. Prepare a primed canvas, sketch lightly, and use high-quality brushes and oils. Paint 'fat over lean' to prevent cracking. Allow each layer to dry before applying the next. Clean brushes often and work in a well-ventilated space.", Map.of("author", "A")),
                new Document("For a natural lawn, select the right grass type for your climate. Water 1 to 1.5 inches per week, avoid overwatering, and use organic fertilizers. Regular aeration helps root growth and prevents compaction. Practice natural pest control and overseeding to maintain a dense lawn.", Map.of("author", "B", "type", "post")));
   */
            TextSplitter splitter = new TokenTextSplitter();
            docs.forEach(doc -> {
                List<Document> splitteddcs = splitter.split(doc);
                vectorStore.add(splitteddcs);
//                try {
//                    TimeUnit.MILLISECONDS.sleep(20000);
//                    logger.info("Added document: {}", doc);
//                } catch (InterruptedException e) {
//                    throw new RuntimeException(e);
//                }
            });
            return "Loading AI Model";
        }
    }
   /* @GetMapping("/search")
    public String search() {
        List<Document> results = vectorStore.similaritySearch(
                SearchRequest
                        .query("learn how to grow things")
                        .withTopK(2)
        );
        return results.toString();
    }*/

    @GetMapping("/search")
    public List<String> searchDocuments (@RequestParam(value = "query", defaultValue = "learn how to grow things") String query ){
        List<Document> results = vectorStore.similaritySearch(
                SearchRequest
                        .query(query)
                        .withTopK(2)
        );
        return results.stream().map(document -> document.getContent()).collect(Collectors.toList());
    }
}

