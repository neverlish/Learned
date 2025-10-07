package redis.lettuce.list;

import io.lettuce.core.KeyValue;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;
import redis.lettuce.CommandAction;
import redis.lettuce.CommandTemplate;

import java.time.Duration;
import java.util.concurrent.CompletableFuture;

public class RedisLettuceBlpop {
    String key = "lettuce:blpop";
    String[] valueAry = "a,b,c,d,e".split(",");

    @Test
    public void blpopTest() {
        CompletableFuture.runAsync(() -> {
            blpop();
        });
        push();
    }

    public void blpop() {
        CommandAction action = (redisCommands -> {
            while (true) {
                KeyValue<String, String> blpop = redisCommands.blpop(10, key);

                if (blpop != null) {
                    System.out.println("blpop.getValue() = " + blpop.getValue());
                }
            }
        });

        CommandTemplate.commandAction(action);
    }

    public void push() {
        CommandAction action = (redisCommands -> {
            for (String message : valueAry) {
                Mono.delay(Duration.ofSeconds(4)).block();
                System.out.println("push...");
                redisCommands.rpush(key, message);
            }
        });

        CommandTemplate.commandAction(action);
    }
}
