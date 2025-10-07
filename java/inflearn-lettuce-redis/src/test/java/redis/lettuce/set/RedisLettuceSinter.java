package redis.lettuce.set;

import org.junit.jupiter.api.Test;
import redis.lettuce.CommandAction;
import redis.lettuce.CommandTemplate;

import java.util.Set;

public class RedisLettuceSinter {
    String mainKey = "lettuce:set:";
    String shinKey = "shin";
    String jungKey = "jung";
    String gangKey = "gang";

    @Test
    public void setAdvanced() {
        CommandAction action = (redisCommands -> {
            redisCommands.sadd(shinKey, "1", "2", "3", "4");
            redisCommands.sadd(jungKey, "3", "4", "5", "6");
            redisCommands.sadd(gangKey, "4", "5", "7");

            System.out.println(shinKey + " = " + redisCommands.smembers(shinKey));
            System.out.println(jungKey + " = " + redisCommands.smembers(jungKey));
            System.out.println(gangKey + " = " + redisCommands.smembers(gangKey));

            Set<String> sinter = redisCommands.sinter(shinKey, jungKey, gangKey);
            System.out.println("sinter = " + sinter);

            Set<String> sunion = redisCommands.sunion(shinKey, jungKey, gangKey);
            System.out.println("sunion = " + sunion);

            Set<String> sdiff = redisCommands.sdiff(shinKey, jungKey, gangKey);
            System.out.println("sdiff = " + sdiff);
        });

        CommandTemplate.commandAction(action);
    }
}
