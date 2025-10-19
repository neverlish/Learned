package com.example.boardservice.client;

import com.example.boardservice.dto.DeductPointRequestDto;
import com.example.boardservice.dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Collections;
import java.util.List;

@Component
public class PointClient {
    private final RestClient restClient;

    public PointClient(
        @Value("${client.point-service.url}") String pointServiceUrl
    ) {
        this.restClient = RestClient.builder()
                .baseUrl(pointServiceUrl)
                .build();
    }

    public void deductPoints(Long userId, int amount) {
        DeductPointRequestDto deductPointRequestDto = new DeductPointRequestDto(userId, amount);

        this.restClient.post()
            .uri("/points/deduct")
            .contentType(MediaType.APPLICATION_JSON)
            .body(deductPointRequestDto)
            .retrieve()
            .toBodilessEntity();
    }
}
