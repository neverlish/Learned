package moviebuddy.cache;

import java.util.Objects;

import moviebuddy.domain.MovieReader;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.util.ClassUtils;

public class CachingAdvice implements MethodInterceptor {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final CacheManager cacheManager;

    public CachingAdvice(CacheManager cacheManager) {
        this.cacheManager = Objects.requireNonNull(cacheManager);
    }

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
//        if (!ClassUtils.isAssignableValue(MovieReader.class, invocation.getThis())) {
//            return invocation.proceed();
//        }
//
//        if (!"loadMovies".equals(invocation.getMethod().getName())) {
//            return invocation.proceed();
//        }

        Cache cache = cacheManager.getCache(invocation.getThis().getClass().getName());
        Object cachedValue = cache.get(invocation.getMethod().getName(), Object.class);
        if (Objects.nonNull(cachedValue)) {
            log.info("returns cached data. [{}]", invocation);
            return cachedValue;
        }

        cachedValue = invocation.proceed();
        cache.put(invocation.getMethod().getName(), cachedValue);
        log.info("caching return value. [{}]", invocation);

        return cachedValue;
    }

}