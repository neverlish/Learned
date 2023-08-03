package com.springboot.hello.data.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import com.springboot.hello.data.entity.Product;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;


@SpringBootTest
public class ProductRepositoryTest2 {
    @Autowired
    private ProductRepository productRepository;

    @Test
    void basicCRUDTest() {
        Product givenProduct = Product.builder()
                .name("노트")
                .price(1000)
                .stock(500)
                .build();

        Product savedProduct = productRepository.save(givenProduct);

        Assertions.assertThat(savedProduct.getNumber())
                .isEqualTo(givenProduct.getNumber());
        Assertions.assertThat(savedProduct.getName())
                .isEqualTo(givenProduct.getName());
        Assertions.assertThat(savedProduct.getPrice())
                .isEqualTo(givenProduct.getPrice());
        Assertions.assertThat(savedProduct.getStock())
                .isEqualTo(givenProduct.getStock());

        Product selectedProduct = productRepository.findById(savedProduct.getNumber()).orElseThrow(RuntimeException::new);

        Assertions.assertThat(selectedProduct.getNumber())
                .isEqualTo(givenProduct.getNumber());
        Assertions.assertThat(selectedProduct.getName())
                .isEqualTo(givenProduct.getName());
        Assertions.assertThat(selectedProduct.getPrice())
                .isEqualTo(givenProduct.getPrice());
        Assertions.assertThat(selectedProduct.getStock())
                .isEqualTo(givenProduct.getStock());

        Product foundProduct = productRepository.findById(selectedProduct.getNumber()).orElseThrow(RuntimeException::new);

        foundProduct.setName("장난감");

        Product updatedProduct = productRepository.save(foundProduct);

        assertEquals(updatedProduct.getName(), "장난감");

        productRepository.delete(updatedProduct);

        assertFalse(productRepository.findById(selectedProduct.getNumber()).isPresent());

    }

    @Test
    void sortingAndPagingTest() {
        Product product1 = new Product();
        product1.setName("펜");
        product1.setPrice(1000);
        product1.setStock(100);
        product1.setCreatedAt(LocalDateTime.now());
        product1.setUpdatedAt(LocalDateTime.now());


        Product product2 = new Product();
        product2.setName("펜");
        product2.setPrice(5000);
        product2.setStock(300);
        product2.setCreatedAt(LocalDateTime.now());
        product2.setUpdatedAt(LocalDateTime.now());

        Product product3 = new Product();
        product3.setName("펜");
        product3.setPrice(500);
        product3.setStock(50);
        product3.setCreatedAt(LocalDateTime.now());
        product3.setUpdatedAt(LocalDateTime.now());

        Product savedProduct1 = productRepository.save(product1);
        Product savedProduct2 = productRepository.save(product2);
        Product savedProduct3 = productRepository.save(product3);

        productRepository.findByName("펜", Sort.by(Sort.Order.asc("price")));
        productRepository.findByName("펜", Sort.by(Sort.Order.asc("price"), Sort.Order.desc("stock")));
        productRepository.findByName("펜", getSort());

        Page<Product> productPage = productRepository.findByName("펜", PageRequest.of(0,2));
        System.out.println(productPage.getContent());
    }

    private Sort getSort() {
        return Sort.by(Sort.Order.asc("price"), Sort.Order.desc("stock"));
    }
}
