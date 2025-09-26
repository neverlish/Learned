package com.example.SpringResilience.controller;

import com.example.SpringResilience.component.Rest1Comp;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class MainController {

    private Rest1Comp rest1Comp;

    @Autowired
    public MainController(Rest1Comp rest1Comp) {

        this.rest1Comp = rest1Comp;
    }

//    @CircuitBreaker(name = "MainControllerMethod1", fallbackMethod = "실패시수행할메소드이름")
//    @Retry(name = "MainControllerMethod1", fallbackMethod = "실패시수행할메소드이름")
//    @Bulkhead(name = "특정할이름", type = Bulkhead.Type.THREADPOOL, fallbackMethod = "실패시수행할메소드이름")
    @Bulkhead(name = "MainControllerMethod1", type = Bulkhead.Type.SEMAPHORE, fallbackMethod = "실패시수행할메소드이름")
    @GetMapping("/")
    public String mainP() {
        return rest1Comp.restTemplate1().getForObject("/data", String.class);
    }


    private String 실패시수행할메소드이름(Throwable throwable) {

        return throwable.getMessage();
    }

}
