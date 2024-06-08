package com.learnkafkastreams.service;

import com.learnkafkastreams.domain.OrderType;
import com.learnkafkastreams.domain.OrdersCountPerStoreByWindows;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.streams.kstream.Windowed;
import org.apache.kafka.streams.state.KeyValueIterator;
import org.apache.kafka.streams.state.ReadOnlyWindowStore;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.List;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.Stream;
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

        return mapToOrdersCountPerStoreBYWindowsDTO(orderTypeEnum, countWindowsIterator);
    }

    private static List<OrdersCountPerStoreByWindows> mapToOrdersCountPerStoreBYWindowsDTO(OrderType orderTypeEnum, KeyValueIterator<Windowed<String>, Long> countWindowsIterator) {
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

    public List<OrdersCountPerStoreByWindows> getAllOrderCountByWindows() {
        var generalOrdersCountByWindows = getOrdersCountWindowsByType(GENERAL_ORDERS);
        var restaurantOrdersCountByWindows = getOrdersCountWindowsByType(RESTAURANT_ORDERS);

        return Stream.of(generalOrdersCountByWindows, restaurantOrdersCountByWindows)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }

    public List<OrdersCountPerStoreByWindows> getAllOrderCountByWindows(LocalDateTime fromTime, LocalDateTime toTime) {
        var fromTimeInstant = fromTime.toInstant(ZoneOffset.UTC);
        var toTimeInstant = toTime.toInstant(ZoneOffset.UTC);

        var generalORdersCountByWindows = getCountWindowsStore(GENERAL_ORDERS)
                .backwardFetchAll(fromTimeInstant, toTimeInstant);
        var generalOrdersCountByWindowsDTO = mapToOrdersCountPerStoreBYWindowsDTO(OrderType.GENERAL, generalORdersCountByWindows);

        var restaurantOrdersCountByWindows = getCountWindowsStore(RESTAURANT_ORDERS)
                .backwardFetchAll(fromTimeInstant, toTimeInstant);

        var restaurantOrdersCountByWindowsDTO = mapToOrdersCountPerStoreBYWindowsDTO(OrderType.RESTAURANT, restaurantOrdersCountByWindows);

        return Stream.of(generalOrdersCountByWindowsDTO, restaurantOrdersCountByWindowsDTO)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());


    }
}
