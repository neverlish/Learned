package com.fastcampus.jpa.bookmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class BookmanagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookmanagerApplication.class, args);
    }

}
