package com.example.springai_redis_vector_search.model;

import java.util.List;

public record ChatResponse(String answer, List<ContextChunk> contextChunks, String question) {
}
