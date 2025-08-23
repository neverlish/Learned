package moviebuddy.data;

import java.util.List;

import moviebuddy.MovieBuddyFactory;
import moviebuddy.MovieBuddyProfile;
import moviebuddy.data.XmlMovieReader;
import moviebuddy.domain.Movie;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@ActiveProfiles(MovieBuddyProfile.XML_MODE)
@SpringJUnitConfig(MovieBuddyFactory.class)
public class XmlMovieReaderTest {
    @Autowired
    XmlMovieReader movieReader;

    @Test
    void NotEmpty_LoadedMovies() {
        List<Movie> movies = movieReader.loadMovies();
        Assertions.assertEquals(1375, movies.size());
    }

}