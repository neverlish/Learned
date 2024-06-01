package com.learnkafkastreams.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public record Greeting(String message,
                LocalDateTime dateTime) {

}