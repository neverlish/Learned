package moviebuddy.data;

import moviebuddy.domain.Movie;
import moviebuddy.domain.MovieReader;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

import java.util.List;
import java.util.Objects;

public class CachingMovieReader implements MovieReader {
    static final String CACHE_NAME = CachingMovieReader.class.getName();
    static final String CACHE_KEY = "movies";

    private final CacheManager cacheManager;
    private final MovieReader target;

    public CachingMovieReader(CacheManager cacheManager, MovieReader target) {
        this.cacheManager = Objects.requireNonNull(cacheManager);
        this.target = Objects.requireNonNull(target);
    }

    @Override
    public List<Movie> loadMovies() {
        Cache cache = cacheManager.getCache(CACHE_NAME);
        List<Movie> movies = getCachedData();

        if (Objects.nonNull(movies)) {
            return movies;
        }

        movies = target.loadMovies();

        cache.put(CACHE_KEY, movies);

        return movies;
    }

    public List<Movie> getCachedData() {
        Cache cache = cacheManager.getCache(CACHE_NAME);
        return cache.get(CACHE_KEY, List.class);
    }
}

