package com.example.secondtest.util;

public class ValidationUtil {
    // email valid
    public static boolean isEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }
}
