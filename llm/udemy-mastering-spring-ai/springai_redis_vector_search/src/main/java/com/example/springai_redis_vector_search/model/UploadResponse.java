package com.example.springai_redis_vector_search.model;

public record UploadResponse(boolean success, String message, String fileName, int chunksStored) {
}
