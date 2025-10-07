package redis.lettuce.zset;

import io.lettuce.core.Range;
import org.junit.jupiter.api.Test;
import redis.lettuce.CommandAction;
import redis.lettuce.CommandTemplate;

import java.util.List;

public class RedisLettuceZSet {
    String key = "lettuce:zset";
    String[] memberAry = "a,b,c,d,e,f,g".split(",");

    @Test
    public void zSet() {
        CommandAction action = (redisCommands -> {
            int score = 0;

            for (String member: memberAry) {
                redisCommands.zadd(key, score++, member);
            }

            List<String> zrange = redisCommands.zrange(key, 0, -1);
            System.out.println("zrange = " + zrange);

            List<String> zrevrange = redisCommands.zrevrange(key, 0, -1);
            System.out.println("zrevrange = " + zrevrange);

            Long zcard = redisCommands.zcard(key);
            System.out.println("zcard = " + zcard);

            Long zcount = redisCommands.zcount(key, Range.create(0, 5));
            System.out.println("zcount = " + zcount);

            redisCommands.zrem(key, "a", "b", "c");

            zrange = redisCommands.zrange(key, 0, -1);
            System.out.println("zrange = " + zrange);
        });

        CommandTemplate.commandAction(action);
    }
}
