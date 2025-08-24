package moviebuddy.domain;

import javax.cache.annotation.CacheResult;
import java.util.List;

public interface MovieReader {
    @CacheResult(cacheName = "movies")
    List<Movie> loadMovies();
}
