package com.learnkafkastreams.controller;

import com.learnkafkastreams.domain.OrdersCountPerStoreByWindows;
import com.learnkafkastreams.service.OrdersWindowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/orders")
public class OrderWindowsController {
    private OrdersWindowService ordersWindowService;

    public OrderWindowsController(OrdersWindowService ordersWindowService) {
        this.ordersWindowService = ordersWindowService;
    }

    @GetMapping("/windows/count/{order_type}")
    public List<OrdersCountPerStoreByWindows> ordersCount(
        @PathVariable("order_type") String orderType
    ) {
        return ordersWindowService.getOrdersCountWindowsByType(orderType);
    }

    @GetMapping("/windows/count")
    public List<OrdersCountPerStoreByWindows> getAllOrderCountByWindows(

    ) {
        return ordersWindowService.getAllOrderCountByWindows();
    }
}
