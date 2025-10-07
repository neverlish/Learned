package redis.lettuce.list;

import org.junit.jupiter.api.Test;
import redis.lettuce.CommandAction;
import redis.lettuce.CommandTemplate;

public class RedisLettuceList {
    String key = "lettuce:list";
    String[] valueAry = "a,b,c,d,e".split(",");

    @Test
    public void fifo() {
        CommandAction action = (redisCommands -> {
            redisCommands.rpush(key, valueAry);

            String lpop = redisCommands.lpop(key);
            System.out.println("lpop = " + lpop);

            while ((lpop = redisCommands.lpop(key)) != null) {
                System.out.println("lpop = " + lpop);
            }
        });

        CommandTemplate.commandAction(action);
    }

    @Test
    public void lifo() {
        CommandAction action = (redisCommands -> {
            redisCommands.lpush(key, valueAry);

            String lpop = redisCommands.lpop(key);
            System.out.println("lpop = " + lpop);

            while ((lpop = redisCommands.lpop(key)) != null) {
                System.out.println("lpop = " + lpop);
            }
        });

        CommandTemplate.commandAction(action);
    }
}
