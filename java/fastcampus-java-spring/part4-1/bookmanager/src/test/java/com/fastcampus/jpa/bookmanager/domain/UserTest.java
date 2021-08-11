package com.fastcampus.jpa.bookmanager.domain;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

class UserTest {

    @Test
    void test() {
        User user = new User();
        user.setEmail("martin@fastcampus.com");
        user.setName("martin");

        User user1 = new User(null, "martin@fastcampus.com", "martin", LocalDateTime.now(), LocalDateTime.now());
        User user2 = new User("martin@fastcampus.com", "martin");

        User user3 = User.builder().name("martin").email("martin@fastcampus.com").build();

        System.out.println("user " + user);
    }
}