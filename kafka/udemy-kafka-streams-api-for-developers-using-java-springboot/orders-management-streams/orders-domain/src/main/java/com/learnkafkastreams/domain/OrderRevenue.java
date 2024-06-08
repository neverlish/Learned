package com.learnkafkastreams.domain;

public record OrderRevenue(
        String locationId,

        OrderType orderType,
        TotalRevenue totalRevenue
) {
}
