package com.greglturnquist.hackingspringbootreactive;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;

@RestController
public class ApiItemController {
    private final ItemRepository repository;

    public ApiItemController(ItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/items")
    Flux<Item> findAll() {
        return this.repository.findAll();
    }

    @GetMapping("/api/items/{id}")
    Mono<Item> findOne(@PathVariable String id) {
        return this.repository.findById(id);
    }

    @PostMapping("/api/items")
    Mono<ResponseEntity<?>> addNewItem(@RequestBody Mono<Item> item) {
        return item.flatMap(s -> this.repository.save(s))
                .map(savedItem -> ResponseEntity
                        .created(URI.create("/api/items/" + savedItem.getId()))
                        .body(savedItem));
    }

    @PutMapping("/api/items/{id}")
    public Mono<ResponseEntity<?>> updateItem(
        @RequestBody Mono<Item> item,
        @PathVariable String id
    ) {
        return item
                .map(content -> new Item(id, content.getName(), content.getDescription(), content.getPrice()))
                .flatMap(this.repository::save)
                .map(ResponseEntity::ok);
    }
}
