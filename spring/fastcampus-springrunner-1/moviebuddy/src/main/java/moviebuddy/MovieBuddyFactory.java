package moviebuddy;

import moviebuddy.domain.CsvMovieReader;
import moviebuddy.domain.MovieFinder;
import moviebuddy.domain.MovieReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MovieBuddyFactory {

    @Bean
    public MovieReader movieReader() {
        return new CsvMovieReader();
    }

    @Bean
//    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public MovieFinder movieFinder(MovieReader movieReader) {
        return new MovieFinder(movieReader);
    }
}
