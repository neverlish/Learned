package com.example.productorderservice.order;

import com.example.productorderservice.product.Product;

interface OrderPort {

    Product getProductById(Long productId);

    void save(Order order);
}
