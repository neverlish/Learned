package com.springboot.hello.data.repository.support;

import com.springboot.hello.data.entity.Product;
import com.springboot.hello.data.repository.custom.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class ProductRepositoryTest {
    @Autowired
    ProductRepository productRepository;

    @Test
    void findByNameTest() {
        List<Product> productList = productRepository.findByName("펜");

        for (Product product: productList) {
            System.out.println(product.getNumber());
            System.out.println(product.getName());
            System.out.println(product.getPrice());
            System.out.println(product.getStock());
        }
    }
}
