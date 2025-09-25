package com.hello.world.usingwell;

import com.hello.world.usingwell.objectmapper.Item;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@Slf4j
public class MyRestController {
    private final RestTemplate restTemplate;
    private final RestClient restClient;

    public MyRestController(RestTemplate restTemplate, RestClient restClient) {
        this.restTemplate = restTemplate;
        this.restClient = restClient;
    }

    @GetMapping("/objectMapper")
    public Item getItem() {
        Item item = new Item();
        item.setId("a1");
        item.setName("hello");
        item.setLocalDateTime(LocalDateTime.now());
        item.setLocalDate(LocalDate.now());
        return item;
    }

    @GetMapping("/target")
    public String target() {
        log.info("target");
        return "target";
    }

    @GetMapping("/restTemplate")
    public String restTemplate() {
        ResponseEntity<String> forEntity = restTemplate.getForEntity("http://localhost:8080/target", String.class);
        String body = forEntity.getBody();
        log.info("body: {}", body);
        return body;
    }

    @GetMapping("/restClient")
    public String restClient() {
        String body = restClient.get().uri("http://localhost:8080/target")
                .retrieve()
                .body(String.class);
        log.info("body: {}", body);
        return body;
    }
}
