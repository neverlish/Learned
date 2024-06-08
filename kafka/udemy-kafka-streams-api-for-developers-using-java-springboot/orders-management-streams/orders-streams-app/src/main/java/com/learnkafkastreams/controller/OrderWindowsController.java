package com.learnkafkastreams.controller;

import com.learnkafkastreams.domain.OrdersCountPerStoreByWindows;
import com.learnkafkastreams.service.OrdersWindowService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
            @RequestParam(value="from_time", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime fromTime,
            @RequestParam(value="to_time", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime toTime
    ) {
        if (fromTime != null && toTime != null) {
            return ordersWindowService.getAllOrderCountByWindows(fromTime, toTime);
        }
        return ordersWindowService.getAllOrderCountByWindows();
    }
}
