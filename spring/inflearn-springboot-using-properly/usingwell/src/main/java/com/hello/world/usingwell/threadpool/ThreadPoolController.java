package com.hello.world.usingwell.threadpool;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class ThreadPoolController {
    private final ThreadPoolTarget threadPoolTarget;

    public ThreadPoolController(ThreadPoolTarget threadPoolTarget) {
        this.threadPoolTarget = threadPoolTarget;
    }

    @GetMapping("/threadPool")
    public String threadPool() {
        MDC.put("userId", "helloWorld");
        log.info("threadPool. userID: {}", MDC.get("userId"));
        threadPoolTarget.async();
        return "ok";
    }
}
