package redis.lettuce;

import io.lettuce.core.api.sync.RedisCommands;

@FunctionalInterface
public interface CommandAction {
    void doInExecute(RedisCommands<String, String> redisCommands);
}
