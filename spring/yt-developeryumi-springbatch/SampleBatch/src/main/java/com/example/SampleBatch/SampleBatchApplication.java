package com.example.SampleBatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SampleBatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(SampleBatchApplication.class, args);
	}

}
