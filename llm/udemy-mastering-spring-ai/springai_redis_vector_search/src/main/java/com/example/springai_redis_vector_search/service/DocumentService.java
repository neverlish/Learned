package com.example.springai_redis_vector_search.service;

import com.example.springai_redis_vector_search.model.ContextChunk;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Service
public class DocumentService {
    private static final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final VectorStore vectorStore;

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    public DocumentService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public int ingestDocument(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path savedPath = uploadPath.resolve(file.getOriginalFilename()).toAbsolutePath().normalize();
        file.transferTo(savedPath.toFile());

        String fileName = file.getOriginalFilename();
        String lowerName = fileName != null ? fileName.toLowerCase() : "";

        // Tika handles PDF, DOCX, TXT and many more formats
        List<Document> documents = readWithTika(savedPath, fileName);

        log.info("Loaded {} raw documents from {}", documents.size(), fileName);

        // Split into chunks using builder API
        TokenTextSplitter splitter = TokenTextSplitter.builder()
                .withChunkSize(512)
                .withMinChunkSizeChars(100)
                .withMinChunkLengthToEmbed(5)
                .withMaxNumChunks(10000)
                .withKeepSeparator(true)
                .build();
        List<Document> chunks = splitter.apply(documents);

        log.info("Split into {} chunks", chunks.size());

        // Add source metadata to each chunk
        chunks.forEach(doc -> doc.getMetadata().putIfAbsent("source", fileName));

        // Store in Redis vector store
        vectorStore.add(chunks);

        log.info("Stored {} chunks in Redis for file: {}", chunks.size(), fileName);
        return chunks.size();
    }

    private List<Document> readWithTika(Path filePath, String fileName) {
        TikaDocumentReader reader = new TikaDocumentReader(
                new FileSystemResource(filePath.toFile()));
        List<Document> docs = reader.read();
        docs.forEach(d -> d.getMetadata().put("source", fileName));
        return docs;
    }

    public List<ContextChunk> search(String query, int topK) {
        List<Document> results = vectorStore.similaritySearch(
                org.springframework.ai.vectorstore.SearchRequest.builder()
                        .query(query)
                        .topK(topK)
                        .build()
        );

        return results.stream().map(doc -> {
            String source = (String) doc.getMetadata().getOrDefault("source", "unknown");
            double score = doc.getScore() != null ? doc.getScore() : 0.0;
            return new ContextChunk(doc.getText(), source, score);
        }).toList();
    }
}
