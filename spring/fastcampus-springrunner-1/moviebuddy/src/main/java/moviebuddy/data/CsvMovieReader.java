package moviebuddy.data;

import moviebuddy.ApplicationException;
import moviebuddy.MovieBuddyProfile;
import moviebuddy.domain.Movie;
import moviebuddy.domain.MovieReader;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Profile(MovieBuddyProfile.CSV_MODE)
@Repository
public class CsvMovieReader extends AbstractMetadataResourceMovieReader implements MovieReader {
//    private final Cache<String, List<Movie>> cache;
    private final CacheManager cacheManager;

    public CsvMovieReader(CacheManager cacheManager) {
        this.cacheManager = Objects.requireNonNull(cacheManager);
    }

    @Override
    public List<Movie> loadMovies() {
        Cache cache = cacheManager.getCache(getClass().getName());
        List<Movie> movies = cache.get("csv.movies", List.class);

        if (Objects.nonNull(movies) && movies.size() > 0) {
            return movies;
        }

        try {
            final InputStream content = getMetadataResource().getInputStream();

            final Function<String, Movie> mapCsv = csv -> {
                try {
                    // split with comma
                    String[] values = csv.split(",");

                    String title = values[0];
                    List<String> genres = Arrays.asList(values[1].split("\\|"));
                    String language = values[2].trim();
                    String country = values[3].trim();
                    int releaseYear = Integer.valueOf(values[4].trim());
                    String director = values[5].trim();
                    List<String> actors = Arrays.asList(values[6].split("\\|"));
                    URL imdbLink = new URL(values[7].trim());
                    String watchedDate = values[8];

                    return Movie.of(title, genres, language, country, releaseYear, director, actors, imdbLink, watchedDate);
                } catch (IOException error) {
                    throw new ApplicationException("mapping csv to object failed.", error);
                }
            };

            movies =  new BufferedReader(new InputStreamReader(content, StandardCharsets.UTF_8))
                    .lines()
                    .skip(1)
                    .map(mapCsv)
                    .collect(Collectors.toList());
        } catch (IOException error) {
            throw new ApplicationException("failed to load movies data.", error);
        }

        cache.put("csv.movies", movies);
        return movies;
    }

}

