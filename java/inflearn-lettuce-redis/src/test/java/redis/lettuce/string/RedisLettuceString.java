package redis.lettuce.string;

import io.lettuce.core.GetExArgs;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.SetArgs;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import org.junit.jupiter.api.Test;

import java.time.Duration;

public class RedisLettuceString {
    @Test
    public void setGet() {
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

        redisCommands.set(key, value);
        String get = redisCommands.get(key);
        System.out.println("get = " + get);

        Long ttl = redisCommands.ttl(key);
        System.out.println("ttl = " + ttl);

        redisCommands.expire(key, Duration.ofMinutes(1));
        System.out.println("ttl = " + redisCommands.ttl(key));

        SetArgs setArgs = SetArgs.Builder
//                .ex(90);
            .keepttl();
        redisCommands.set(key, value + "_new", setArgs);
        System.out.println("ttl = " + redisCommands.ttl(key));

        String getdel = redisCommands.getdel(key);
        System.out.println("getdel = " + getdel);
        System.out.println("ttl = " + redisCommands.ttl(key));

        GetExArgs getExArgs = GetExArgs.Builder.ex(120);
        String getex = redisCommands.getex(key, getExArgs);
        System.out.println("getex = " + getex);
        System.out.println("ttl = " + redisCommands.ttl(key));

        connection.close();
        redisClient.shutdown();
    }
}
