package hello.world.virtualthread.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class VirtualScheduler {


    @Scheduled(fixedRate = 5000)
    public void fixedRate() {
        log.info("fixedRate. thread: {}", Thread.currentThread());
    }

    @Scheduled(fixedRate = 5000, scheduler = "threadPoolTaskScheduler")
    public void fixedRate2() {
        log.info("fixedRate2. thread: {}", Thread.currentThread());
    }
}