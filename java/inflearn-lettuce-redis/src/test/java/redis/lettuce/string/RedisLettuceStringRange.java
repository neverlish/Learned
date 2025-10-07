package redis.lettuce.string;

import io.lettuce.core.KeyValue;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import org.junit.jupiter.api.Test;
import redis.lettuce.CommandAction;
import redis.lettuce.CommandTemplate;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class RedisLettuceStringRange {
    @Test
    public void substring() {
        CommandAction action = (redisCommands -> {
            String key = "lettuce:string";
            String value = "hello";

            redisCommands.set(key, value);

            String get = redisCommands.get(key);
            System.out.println("get = " + get);

            redisCommands.append(key, "_addr");
            System.out.println("get = " + redisCommands.get(key));

            Long strlen = redisCommands.strlen(key);
            System.out.println("strlen = " + strlen);

            String getrange = redisCommands.getrange(key, 0, 4);
            System.out.println("getrange = " + getrange);

            redisCommands.setrange(key, 6, "updateStr");
            System.out.println("get = " + redisCommands.get(key));

            Map<String, String> map = new LinkedHashMap<>();
            for (int i = 0; i < 5; i++) {
                map.put(key+i, value+i);
            }
            redisCommands.mset(map);
            List<KeyValue<String, String>> mget = redisCommands.mget(map.keySet().toArray(new String[0]));
            
            mget.stream().forEach(m -> {
                System.out.println("key = " + m.getKey() + ",value = " + m.getValue());
            });

        });

        CommandTemplate.commandAction(action);
    }
}
