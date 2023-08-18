package com.springboot.hello.service;

import com.springboot.hello.data.dto.SignInResultDto;
import com.springboot.hello.data.dto.SignUpResultDto;

public interface SignService {
    SignUpResultDto signUp(String id, String password, String name, String role);
    SignInResultDto signIn(String id, String password) throws RuntimeException;
}
