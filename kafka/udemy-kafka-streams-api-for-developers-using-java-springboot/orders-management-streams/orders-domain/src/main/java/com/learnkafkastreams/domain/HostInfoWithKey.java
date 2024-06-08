package com.learnkafkastreams.domain;

public record HostInfoWithKey(
    String host,
    int port,
    String key
) {
}
