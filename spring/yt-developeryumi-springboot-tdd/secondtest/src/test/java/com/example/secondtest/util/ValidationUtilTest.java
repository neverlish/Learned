package com.example.secondtest.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ValidationUtilTest {
    @Test
    void isEmail_테스트1() {

        // given
        String email = "test@test.com";

        // when
        boolean result = ValidationUtil.isEmail(email);

        // then
        assertTrue(result);

    }

    @Test
    void isEmail_테스트2() {

        // given
        String email = "test.com";

        // when
        boolean result = ValidationUtil.isEmail(email);

        // then
        assertFalse(result);

    }
}