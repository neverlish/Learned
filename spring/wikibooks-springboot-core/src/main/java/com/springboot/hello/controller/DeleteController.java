package com.springboot.hello.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/delete-api")
public class DeleteController {
    @DeleteMapping(value = "/{variable}")
    public String DeleteVariable(@PathVariable String variable) {
        return variable;
    }

    @DeleteMapping(value = "/request1")
    public String getRequestParam1(@RequestParam String email) {
        return "e-mail : " + email;
    }
}
