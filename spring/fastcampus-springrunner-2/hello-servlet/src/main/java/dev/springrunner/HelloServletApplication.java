package dev.springrunner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class HelloServletApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelloServletApplication.class, args);
	}

}
