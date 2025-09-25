package com.hello.world.usingwell.threadpool;

import org.slf4j.MDC;
import org.springframework.core.task.TaskDecorator;

import java.util.Map;

public class ThreadLocalCopyTaskDecorator implements TaskDecorator {
    @Override
    public Runnable decorate(Runnable runnable) {
        Map<String, String> map = MDC.getCopyOfContextMap();

        return new Runnable() {
            @Override
            public void run() {
                if (map != null) {
                    MDC.setContextMap(map);
                }
                try {
                    runnable.run();
                } finally {
                    MDC.clear();
                }
            }
        };
    }
}
