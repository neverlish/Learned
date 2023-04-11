package com.example.productorderservice.payment;

interface PaymentGateway {
    void execute(int totalPrice, String cardNumber);
}
