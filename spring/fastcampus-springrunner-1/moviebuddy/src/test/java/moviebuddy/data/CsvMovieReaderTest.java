package moviebuddy.data;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.DefaultResourceLoader;

import java.io.FileNotFoundException;

public class CsvMovieReaderTest {
    @Test
    void Valid_Metadata() throws Exception {
        CsvMovieReader movieReader = new CsvMovieReader();
        movieReader.setMetadata("movie_metadata.csv");
        movieReader.setResourceLoader(new DefaultResourceLoader());

        movieReader.afterPropertiesSet();
    }

    @Test
    void Invalid_Metadata() {
        CsvMovieReader movieReader = new CsvMovieReader();
        movieReader.setResourceLoader(new DefaultResourceLoader());

        Assertions.assertThrows(FileNotFoundException.class, () -> {
            movieReader.setMetadata("invalid");
            movieReader.afterPropertiesSet();
        });
    }

}
