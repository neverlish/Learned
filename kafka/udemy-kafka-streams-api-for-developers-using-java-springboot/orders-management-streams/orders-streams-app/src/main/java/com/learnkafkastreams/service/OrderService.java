package com.learnkafkastreams.service;

import com.learnkafkastreams.client.OrderServiceClient;
import com.learnkafkastreams.domain.*;
import com.learnkafkastreams.producer.MetaDataService;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.streams.state.ReadOnlyKeyValueStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Spliterators;
import java.util.function.BiFunction;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static com.learnkafkastreams.topology.OrdersTopology.*;

@Service
@Slf4j
public class OrderService {

    private OrderStoreService orderStoreService;
    private OrderServiceClient orderServiceClient;
    private MetaDataService metaDataService;

    @Value("${server.port}")
    private Integer port;

    public OrderService(OrderStoreService orderStoreService, OrderServiceClient orderServiceClient, MetaDataService metaDataService) {
        this.orderStoreService = orderStoreService;
        this.orderServiceClient = orderServiceClient;
        this.metaDataService = metaDataService;
    }

    public List<OrderCountPerStore> getOrdersCount(String orderType, String queryOrderHosts) {
        var ordersCountStore = getOrderStore(orderType);
        var orders = ordersCountStore.all();
        var spliterator = Spliterators.spliteratorUnknownSize(orders, 0);

        var orderCountPerStoreDTOLIstCurrentInstance = StreamSupport.stream(spliterator, false)
                .map(keyValue -> new OrderCountPerStore(keyValue.key, keyValue.value))
                .collect(Collectors.toList());

        var orderCountPerStoreDTOList = retrieveDataFromOtherInstances(orderType, Boolean.parseBoolean(queryOrderHosts));

        return Stream.of(orderCountPerStoreDTOLIstCurrentInstance, orderCountPerStoreDTOList)
                .filter(Objects::nonNull)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }

    private List<OrderCountPerStore> retrieveDataFromOtherInstances(String orderType, boolean queryOrderHosts) {
        var otherHosts = otherHosts();
        log.info("Other hosts: {}", otherHosts);

        if (queryOrderHosts && otherHosts != null && !otherHosts.isEmpty()) {
            return otherHosts
                    .stream()
                    .map(hostInfo -> orderServiceClient.retrieveOrdersCountByOrderType(hostInfo, orderType))
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());
        }
        return null;
    }

    private List<HostInfo> otherHosts() {

        try {
            var currentMachineAddress = InetAddress.getLocalHost().getHostAddress();
            return metaDataService.getStreamsMetadata()
                    .stream()
                    .filter(hostInfo -> !currentMachineAddress.equals(hostInfo.host()) && hostInfo.port() != port)
                    .collect(Collectors.toList());
        } catch (UnknownHostException e) {
            log.error("EXception in otherHosts : {}", e.getMessage(), e);
        }
        return null;

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

    public List<AllOrdersCountPerStore> getAllOrdersCount() {
        BiFunction<OrderCountPerStore, OrderType, AllOrdersCountPerStore> mapper = (orderCountPerStore, orderType) ->
            new AllOrdersCountPerStore(orderCountPerStore.locationId(), orderCountPerStore.orderCount(), orderType);

        var generalOrdersCount = getOrdersCount(GENERAL_ORDERS, "false")
                .stream()
                .map(orderCountPerStore -> mapper.apply(orderCountPerStore, OrderType.GENERAL))
                .toList();

        var restaurantOrdersCount = getOrdersCount(RESTAURANT_ORDERS, "false")
                .stream()
                .map(orderCountPerStore -> mapper.apply(orderCountPerStore, OrderType.RESTAURANT))
                .toList();

        return Stream.of(generalOrdersCount, restaurantOrdersCount)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());

    }

    public List<OrderRevenue> revenueByOrderType(String orderType) {
        var revenueStoreByType = getRevenueStore(orderType);

        var revenueIterator = revenueStoreByType.all();

        var spliterator = Spliterators.spliteratorUnknownSize(revenueIterator, 0);

        return StreamSupport.stream(spliterator, false)
                .map(keyValue -> new OrderRevenue(keyValue.key, mapOrderType(orderType), keyValue.value))
                .collect(Collectors.toList());
    }

    public static OrderType mapOrderType(String orderType) {
        return switch (orderType) {
            case GENERAL_ORDERS -> OrderType.GENERAL;
            case RESTAURANT_ORDERS -> OrderType.RESTAURANT;
            default -> throw new IllegalStateException("Not a valid option");
        };
    }

    private ReadOnlyKeyValueStore<String, TotalRevenue> getRevenueStore(String orderType) {
        return switch (orderType) {
            case GENERAL_ORDERS -> orderStoreService.orderRevenueStore(GENERAL_ORDERS_REVENUE);
            case RESTAURANT_ORDERS -> orderStoreService.orderRevenueStore(RESTAURANT_ORDERS_REVENUE);
            default -> throw new IllegalStateException("Not a valid option");
        };
    }
}
