package hello.world.tutorial.websocketdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class WebsocketdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebsocketdemoApplication.class, args);
	}

}
