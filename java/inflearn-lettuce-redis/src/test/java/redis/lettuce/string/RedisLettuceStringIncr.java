package redis.lettuce.string;

import io.lettuce.core.GetExArgs;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.SetArgs;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import org.junit.jupiter.api.Test;

import java.time.Duration;

public class RedisLettuceStringIncr {
    @Test
    public void incrDecr() {
        RedisURI redisURI = RedisURI.builder()
                .withHost("localhost")
                .withPort(6379)
                .withDatabase(0)
                .build();

        RedisClient redisClient = RedisClient.create(redisURI);
        StatefulRedisConnection<String, String> connection = redisClient.connect();
        RedisCommands<String, String> redisCommands = connection.sync();

        String key = "lettuce:string";
        String value = "hello";

//        redisCommands.set(key, value);
        redisCommands.flushdb();

        Long incr = redisCommands.incr(key);
        System.out.println("incr = " + incr);

        Long decr = redisCommands.decr(key);
        System.out.println("decr = " + decr);

        Long incrBy = redisCommands.incrby(key, 10);
        System.out.println("incrBy = " + incrBy);

        Long decrby = redisCommands.decrby(key, 20);
        System.out.println("decrby = " + decrby);

        connection.close();
        redisClient.shutdown();
    }
}
