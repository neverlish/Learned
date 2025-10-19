package com.elevenst.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ProductRemoteServiceImpl implements ProductRemoteService {
    public static final String URL = "http://localhost:8082/products/";

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public String getProductInfo(String productId) {
        return restTemplate.getForObject(URL + productId, String.class);
    }
}
