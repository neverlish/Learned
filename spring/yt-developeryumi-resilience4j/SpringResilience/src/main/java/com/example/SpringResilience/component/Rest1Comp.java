package com.example.SpringResilience.component;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class Rest1Comp {

    @Bean
    public RestTemplate restTemplate1() {

        return new RestTemplateBuilder().rootUri("http://localhost:9000")
                .build();
    }

}
