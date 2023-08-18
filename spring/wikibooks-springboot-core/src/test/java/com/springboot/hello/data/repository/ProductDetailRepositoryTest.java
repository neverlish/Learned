package com.springboot.hello.data.repository;

import com.springboot.hello.data.entity.Product;
import com.springboot.hello.data.entity.ProductDetail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ProductDetailRepositoryTest {
    @Autowired
    ProductDetailRepository productDetailRepository;

    @Autowired
    ProductRepository productRepository;

    @Test
    public void saveAndReadTest1() {
        Product product = new Product();
        product.setName("스프링 부트 JPA");
        product.setPrice(5000);
        product.setStock(500);
        productRepository.save(product);

        ProductDetail productDetail = new ProductDetail();
        productDetail.setProduct(product);
        productDetail.setDescription("스프링 부트와 JPA를 함꼐 볼 수 있는 책");
        productDetailRepository.save(productDetail);

        System.out.println("savedProduct : " + productDetailRepository.findById(productDetail.getId()).get().getProduct());

        System.out.println("savedProductDetail : " + productDetailRepository.findById(productDetail.getId()).get());
    }
}