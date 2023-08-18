package com.springboot.hello.service;

import com.springboot.hello.dto.MemberDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class WebClientService {
    public String getName() {
        WebClient webClient = WebClient.builder()
                .baseUrl("http://localhost:9090")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        return webClient.get()
                .uri("/api/v1/crud-api")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getNameWithPathVariable() {
        WebClient webClient = WebClient.create("http://localhost:9090");

        ResponseEntity<String> responseEntity = webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/api/v1/crud-api/{name}").build("Flature"))
                .retrieve().toEntity(String.class).block();

        return responseEntity.getBody();
    }

    public String getNameWithParameter() {
        WebClient webClient = WebClient.create("http://localhost:9090");

        return webClient.get().uri(uriBuilder -> uriBuilder.path("/api/v1/crud-api/param")
                .queryParam("name","Flature")
                .build())
            .exchangeToMono(clientResponse -> {
                if (clientResponse.statusCode().equals(HttpStatus.OK)) {
                    return clientResponse.bodyToMono(String.class);
                } else {
                    return clientResponse.createException().flatMap(Mono::error);
                }
            })
            .block();
    }

    public ResponseEntity<MemberDto> postWithParamAndBody() {
        WebClient webClient = WebClient.builder()
                .baseUrl("http://localhost:9090")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        MemberDto memberDto = new MemberDto();
        memberDto.setName("flature!!");
        memberDto.setEmail("flature@gmail.com");
        memberDto.setOrganization("Around Hub Studio");

        return webClient.post().uri(uriBuilder -> uriBuilder.path("/api/v1/crud-api")
                .queryParam("name", "Flature")
                .queryParam("email", "flature@wikibooks.co.kr")
                .queryParam("organization", "Wikibooks")
                .build())
            .bodyValue(memberDto)
            .retrieve()
            .toEntity(MemberDto.class)
            .block();
    }

    public ResponseEntity<MemberDto> postWithHeader() {
        WebClient webClient = WebClient.builder()
                .baseUrl("http://localhost:9090")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        MemberDto memberDto = new MemberDto();
        memberDto.setName("flature!!");
        memberDto.setEmail("flature@gmail.com");
        memberDto.setOrganization("Around Hub Studio");

        return webClient
                .post()
                .uri(uriBuilder -> uriBuilder.path("/api/v1/crud-api/add-header").build())
                .bodyValue(memberDto)
                .header("my-header", "Wikibooks API")
                .retrieve()
                .toEntity(MemberDto.class)
                .block();
    }

}
