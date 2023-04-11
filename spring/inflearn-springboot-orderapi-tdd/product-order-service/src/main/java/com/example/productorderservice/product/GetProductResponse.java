package com.example.productorderservice.product;

import org.springframework.util.Assert;

record GetProductResponse(
        long id,
        String name,
        int price,
        DiscountPolicy discountPolicy
) {
    public GetProductResponse(long id, String name, int price, DiscountPolicy discountPolicy) {
        Assert.notNull(id, "상품 ID는 필수입니다.");
        Assert.notNull(name, "상품명은 필수입니다.");
        Assert.notNull(discountPolicy, "할인 정책은 필수입니다.");
        this.id = id;
        this.name = name;
        this.price = price;
        this.discountPolicy = discountPolicy;
    }
}
