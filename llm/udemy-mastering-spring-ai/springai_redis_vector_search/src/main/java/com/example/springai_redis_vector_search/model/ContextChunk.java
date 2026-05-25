package com.example.springai_redis_vector_search.model;

public record ContextChunk(String content, String source, double score) {
}
