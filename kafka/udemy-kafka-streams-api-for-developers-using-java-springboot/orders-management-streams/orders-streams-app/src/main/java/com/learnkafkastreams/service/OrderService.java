package com.learnkafkastreams.service;

import com.learnkafkastreams.domain.OrderCountPerStore;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.streams.state.ReadOnlyKeyValueStore;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.learnkafkastreams.topology.OrdersTopology.*;

@Service
@Slf4j
public class OrderService {
    private OrderStoreService orderStoreService;

    public OrderService(OrderStoreService orderStoreService) {
        this.orderStoreService = orderStoreService;
    }

    public List<OrderCountPerStore> getOrdersCount(String orderType) {
        var ordersCountStore = getOrderStore(orderType);
        var orders = ordersCountStore.all();
        var spliterator = Spliterators.spliteratorUnknownSize(orders, 0);
        return StreamSupport.stream(spliterator, false)
                .map(keyValue -> new OrderCountPerStore(keyValue.key, keyValue.value))
                .collect(Collectors.toList());
    }


    private ReadOnlyKeyValueStore<String, Long> getOrderStore(String orderType) {
        return switch (orderType) {
            case GENERAL_ORDERS -> orderStoreService.ordersCountStore(GENERAL_ORDERS_COUNT);
            case RESTAURANT_ORDERS -> orderStoreService.ordersCountStore(RESTAURANT_ORDERS_COUNT);
            default -> throw new IllegalStateException("Not a valid option");
        };
    }

    public OrderCountPerStore getOrdersCountByLocation(String orderType, String locationId) {
        var ordersCountStore = getOrderStore(orderType);
        var orderCount = ordersCountStore.get(locationId);
        if (ordersCountStore != null) {
            return new OrderCountPerStore(locationId, orderCount);
        }

        return null;
    }
}
