package com.example.springai_redis_vector_search.config;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.redis.RedisVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.JedisPooled;

@Configuration
public class RedisVectorStoreConfig {
    @Value("${spring.ai.vectorstore.redis.uri:redis://localhost:6379}")
    private String redisUri;

    @Value("${spring.ai.vectorstore.redis.index:rag-doc-index}")
    private String indexName;

    @Value("${spring.ai.vectorstore.redis.prefix:doc:}")
    private String prefix;

    @Bean
    public JedisPooled jedisPooled() {
        return new JedisPooled(redisUri);
    }

    @Bean
    public RedisVectorStore vectorStore(EmbeddingModel embeddingModel, JedisPooled jedisPooled) {
        return RedisVectorStore.builder(jedisPooled, embeddingModel)
                .indexName(indexName)
                .prefix(prefix)
                .metadataFields(
                        RedisVectorStore.MetadataField.text("source"),
                        RedisVectorStore.MetadataField.text("fileName")
                )
                .initializeSchema(true)
                .build();
    }

}
