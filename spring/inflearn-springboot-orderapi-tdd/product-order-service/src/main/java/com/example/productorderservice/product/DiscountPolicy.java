package com.example.productorderservice.product;

public enum DiscountPolicy {
    NONE {
        @Override
        int applyDiscount(int price) {
            return price;
        }
    },
    FIX_1000_AMOUNT {
        @Override
        int applyDiscount(int price) {
            return Math.max(price - 1000, 0);
        }
    }
    ;

    abstract int applyDiscount(int price);
}
