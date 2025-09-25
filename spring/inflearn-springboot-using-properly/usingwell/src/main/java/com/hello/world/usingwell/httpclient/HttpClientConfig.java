package com.hello.world.usingwell.httpclient;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

@Configuration
public class HttpClientConfig {
//    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate;
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

//    @Bean
    public RestClient restClient() {
        RestClient restClient = RestClient.create();
        return restClient;
    }

    @Bean
    public RestClient restClient(RestClient.Builder builder) {
        return builder.build();
    }
}
