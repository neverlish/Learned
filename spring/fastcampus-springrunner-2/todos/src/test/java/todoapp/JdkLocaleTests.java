package todoapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Locale;

public class JdkLocaleTests {
    final static Logger logger = LoggerFactory.getLogger(JdkLocaleTests.class);

    public static void main(String[] args) {
        logging(new Locale("ko", "KR"));
        logging(Locale.KOREA);
        logging(Locale.US);
        logging(Locale.UK);
        logging(Locale.getDefault());
    }

    static void logging(Locale locale) {
        logger.info("Locale: {}", locale);
        logger.info("Language: {}, DisplayLanguage: {}", locale.getLanguage(), locale.getDisplayLanguage());
        logger.info("Counter: {}, DisplayCountry: {}", locale.getCountry(), locale.getDisplayCountry());
    }
}
