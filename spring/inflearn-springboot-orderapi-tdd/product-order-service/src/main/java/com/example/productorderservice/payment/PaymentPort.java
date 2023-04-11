package com.example.productorderservice.payment;

import com.example.productorderservice.order.Order;

interface PaymentPort {
    Order getOrder(Long orderId);

    void save(Payment payment);

    void pay(int totalPrice, String cardNumber);
}
