package com.greglturnquist.hackingspringbootreactive;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import reactor.test.StepVerifier;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
public class MongoDbSliceTest {
    @Autowired
    ItemRepository repository;

    @Test
    void itemRepositorySavesItems() {
        Item sampleItem = new Item("name", "description", 1.99);

        repository.save(sampleItem)
            .as(StepVerifier::create)
            .expectNextMatches(item -> {
                assertThat(item.getId()).isNotNull();
                assertThat(item.getName()).isEqualTo("name");
                assertThat(item.getDescription()).isEqualTo("description");
                assertThat(item.getPrice()).isEqualTo(1.99);

                return true;
            })
            .verifyComplete();
    }
}

