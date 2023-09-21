package com.greglturnquist.hackingspringbootreactive;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.test.StepVerifier;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureWebTestClient
public class HomeControllerTest {
    @Autowired
    WebTestClient webTestClient;

    @Autowired
    ItemRepository repository;

    @Test
    @WithMockUser(username = "alice", roles = { "SOME_OTHER_ROLE" })
    void addingInventoryWithoutProperRoleFails() {
        this.webTestClient.post().uri("/")
                .exchange()
                .expectStatus().isForbidden();
    }

    @Test
    @WithMockUser(username = "bob", roles = { "INVENTORY" })
    void addingInventoryWithProperRoleSucceeds() {
        this.webTestClient.post().uri("/")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("{" +
                        "\"name\": \"iPhone 11\", " +
                        "\"description\": \"upgrade\", " +
                        "\"price\": 999.99" +
                        "}")
                .exchange()
                .expectStatus().isOk();

        this.repository.findByNameContaining("iPhone 11")
                .as(StepVerifier::create)
                .expectNextMatches(item -> {
                    assertThat(item.getDescription()).isEqualTo("upgrade");
                    assertThat(item.getPrice()).isEqualTo(999.99);
                    return true;
                })
                .verifyComplete();
    }
}
