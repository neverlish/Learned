package com.hello.world.usingwell.threadpool;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskDecorator;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@EnableAsync
@Configuration
public class ThreadPoolConfig {
//    @Bean
    public ThreadPoolTaskExecutor threadPoolTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setThreadNamePrefix("myThread-");
        executor.setTaskDecorator(new ThreadLocalCopyTaskDecorator());
        executor.initialize();
        return executor;
    }

    @Bean
    public TaskDecorator myTaskDecorator() {
        return new ThreadLocalCopyTaskDecorator();
    }
}
