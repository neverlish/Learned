package com.example.springai_redis_vector_search.service;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * In-memory tracker for documents that have been indexed into the vector store.
 * Survives across requests so users don't need to re-upload on every question.
 */
@Component
public class DocumentTracker {

    public record IndexedDocument(String fileName, int chunks, String indexedAt) {}

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
    private final List<IndexedDocument> indexedDocuments = Collections.synchronizedList(new ArrayList<>());

    public void track(String fileName, int chunks) {
        // Replace if already tracked (re-upload)
        indexedDocuments.removeIf(d -> d.fileName().equals(fileName));
        indexedDocuments.add(new IndexedDocument(fileName, chunks, LocalDateTime.now().format(FMT)));
    }

    public List<IndexedDocument> getAll() {
        return Collections.unmodifiableList(indexedDocuments);
    }

    public boolean hasDocuments() {
        return !indexedDocuments.isEmpty();
    }
}

