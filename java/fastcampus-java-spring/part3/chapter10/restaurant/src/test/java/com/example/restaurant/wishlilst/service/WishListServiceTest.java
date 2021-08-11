package com.example.restaurant.wishlilst.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WishListServiceTest {

    @Autowired
    private WishListService wishListService;

    @Test
    public void searchTest() {
        var result = wishListService.search("갈비집");

        System.out.println(result);
        Assertions.assertNotNull(result.getCategory());
    }
}