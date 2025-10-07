package redis.lettuce.string;

import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import org.junit.jupiter.api.Test;
import redis.lettuce.CommandAction;
import redis.lettuce.CommandTemplate;

public class RedisLettuceStringRange {
    @Test
    public void substring() {
        CommandAction action = (redisCommands -> {
            String key = "lettuce:string";
            String value = "hello";

            redisCommands.set(key, value);

            String get = redisCommands.get(key);
            System.out.println("get = " + get);
        });

        CommandTemplate.commandAction(action);
    }
}
