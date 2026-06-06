package com.example.springai_elasticsearch_vector_search_demo.config;

import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.apache.http.ssl.SSLContextBuilder;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.boot.autoconfigure.elasticsearch.RestClientBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.net.ssl.SSLContext;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public RestClientBuilderCustomizer restClientBuilderCustomizer() {
        return new RestClientBuilderCustomizer() {
            @Override
            public void customize(RestClientBuilder builder) {
            }

            @Override
            public void customize(HttpAsyncClientBuilder builder) {
                try {
                    SSLContext sslContext = SSLContextBuilder.create()
                            .loadTrustMaterial(null, (chains, authType) -> true)
                            .build();
                    builder.setSSLContext(sslContext);
                    builder.setSSLHostnameVerifier((hostname, session) -> true);
                } catch (Exception e) {
                    throw new RuntimeException("Failed to configure SSL context", e);
                }
            }
        };
    }
}
