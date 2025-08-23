package moviebuddy.domain;

import java.util.List;


public class JaxbMovieReaderTest {

    public static void main(String[] args) {
        JaxbMovieReader jaxbMovieReader = new JaxbMovieReader();

        List<Movie> movies = jaxbMovieReader.loadMovies();
        MovieFinderTest.assertEquals(1375, movies.size());
    }

}