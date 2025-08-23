package moviebuddy;

import moviebuddy.domain.CsvMovieReader;
import moviebuddy.domain.MovieFinder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MovieBuddyFactory {
    @Bean
    public MovieFinder movieFinder()  {
        return new MovieFinder(new CsvMovieReader());
    }
}
