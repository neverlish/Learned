package com.example.APIServer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
@ResponseBody
public class DataController {

    @GetMapping("/data")
    public String dataP() {

        String nowTime = String.valueOf(LocalDateTime.now());

        try {

            Thread.sleep(10000);
        } catch (InterruptedException e) {

            throw new RuntimeException(e);
        }

        return nowTime;
    }
}
