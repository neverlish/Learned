package com.learnkafkastreams.client;

import com.learnkafkastreams.domain.HostInfo;
import com.learnkafkastreams.domain.OrderCountPerStore;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Component
@Slf4j
public class OrderServiceClient {
    private WebClient webClient;

    public OrderServiceClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<OrderCountPerStore> retrieveOrdersCountByOrderType(HostInfo hostInfo, String orderType) {
        var basePath = "http://" + hostInfo.host() + ":" + hostInfo.port();

        var url = UriComponentsBuilder
                .fromHttpUrl(basePath)
                .path("/v1/orders/count/{order_type}")
                .queryParam("query_order_hosts", "false")
                .buildAndExpand(orderType)
                .toString();

        return webClient
                .get()
                .uri(url)
                .retrieve()
                .bodyToFlux(OrderCountPerStore.class)
                .collectList()
                .block();

    }
}
