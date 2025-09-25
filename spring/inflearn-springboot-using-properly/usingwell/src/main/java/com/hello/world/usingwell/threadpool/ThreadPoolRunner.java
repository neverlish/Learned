package com.hello.world.usingwell.threadpool;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ThreadPoolRunner implements ApplicationRunner {
    private final ThreadPoolTarget target;

    public ThreadPoolRunner(ThreadPoolTarget target) {
        this.target = target;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("run...");
        target.async();
    }
}
