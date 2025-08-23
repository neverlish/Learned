package data;

import java.util.List;

import moviebuddy.MovieBuddyFactory;
import moviebuddy.data.JaxbMovieReader;
import moviebuddy.domain.Movie;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig(MovieBuddyFactory.class)
public class JaxbMovieReaderTest {
    @Autowired
    JaxbMovieReader movieReader;

    @Test
    void NotEmpty_LoadedMovies() {
        List<Movie> movies = movieReader.loadMovies();
        Assertions.assertEquals(1375, movies.size());
    }

}