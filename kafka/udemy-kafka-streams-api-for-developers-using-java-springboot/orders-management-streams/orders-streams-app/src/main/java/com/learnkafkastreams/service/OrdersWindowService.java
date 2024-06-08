package com.learnkafkastreams.service;

import com.learnkafkastreams.domain.OrdersCountPerStoreByWindows;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.streams.state.ReadOnlyWindowStore;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.learnkafkastreams.service.OrderService.mapOrderType;
import static com.learnkafkastreams.topology.OrdersTopology.*;

@Service
@Slf4j
public class OrdersWindowService {
    private OrderStoreService orderStoreService;

    public OrdersWindowService(OrderStoreService orderStoreService) {
        this.orderStoreService = orderStoreService;
    }

    public List<OrdersCountPerStoreByWindows> getOrdersCountWindowsByType(String orderType) {
        var countWindowsStore = getCountWindowsStore(orderType);

        var orderTypeEnum = mapOrderType(orderType);

        var countWindowsIterator = countWindowsStore.all();

        var spliterator = Spliterators.spliteratorUnknownSize(countWindowsIterator, 0);

        return StreamSupport.stream(spliterator, false)
                .map(keyValue -> new OrdersCountPerStoreByWindows(
                        keyValue.key.key(),
                        keyValue.value,
                        orderTypeEnum,
                        LocalDateTime.ofInstant(keyValue.key.window().startTime(), ZoneId.of("GMT")),
                        LocalDateTime.ofInstant(keyValue.key.window().endTime(), ZoneId.of("GMT"))
                ))
                .collect(Collectors.toList());
    }

    private ReadOnlyWindowStore<String, Long> getCountWindowsStore(String orderType) {
        return switch (orderType) {
            case GENERAL_ORDERS -> orderStoreService.orderWindowsCountStore(GENERAL_ORDERS_COUNT_WINDOWS);
            case RESTAURANT_ORDERS -> orderStoreService.orderWindowsCountStore(RESTAURANT_ORDERS_COUNT_WINDOWS);
            default -> throw new IllegalStateException("Not a valid option");
        };
    }
}
