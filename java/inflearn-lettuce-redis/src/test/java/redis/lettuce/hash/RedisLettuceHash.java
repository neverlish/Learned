package redis.lettuce.hash;

import io.lettuce.core.KeyValue;
import org.junit.jupiter.api.Test;
import redis.lettuce.CommandAction;
import redis.lettuce.CommandTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RedisLettuceHash {
    @Test
    public void hash() {
        CommandAction action = (redisCommands -> {
            String key = "lettuce:hash";

            String field = "roleCode";
            redisCommands.hset(key, field, "A0001");
            String hget = redisCommands.hget(key, field);
            System.out.println("hget = " + hget);

            Map<String, String> map = new HashMap<>();
            map.put("roleCode", "A0001");
            map.put("dvsnCode", "B1234");
            map.put("age", "36");
            redisCommands.hmset(key, map);

            List<KeyValue<String, String>> hmget = redisCommands.hmget(key, map.keySet().toArray(new String[0]));
            
            hmget.stream().forEach(m -> {
                System.out.println("field = " + m.getKey() + ",value = " + m.getValue());
            });

            Map<String, String> hgetall = redisCommands.hgetall(key);
            System.out.println("hgetall = " + hgetall);
        });

        CommandTemplate.commandAction(action);
    }
}
