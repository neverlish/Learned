package com.greglturnquist.hackingspringbootreactive;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class KitchenService {
    Flux<Dish> getDishes() {
        return Flux.<Dish> generate(sink -> sink.next(randomDish())).delayElements(Duration.ofMillis(250));
    }

    private Dish randomDish() {
        return menu.get(picker.nextInt(menu.size()));
    }

    private List<Dish> menu = Arrays.asList(
        new Dish("Sesame chiciken"),
        new Dish("Lo mein noodles, plain"),
        new Dish("Sweet & sour beef")
    );

    private Random picker = new Random();
}
