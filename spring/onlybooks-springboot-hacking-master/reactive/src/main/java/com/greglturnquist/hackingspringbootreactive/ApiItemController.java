package com.greglturnquist.hackingspringbootreactive;

import org.springframework.hateoas.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;

import static com.greglturnquist.hackingspringbootreactive.SecurityConfig.INVENTORY;
import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.linkTo;
import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.methodOn;


@RestController
public class ApiItemController {

    private static final SimpleGrantedAuthority ROLE_INVENTORY = //
            new SimpleGrantedAuthority("ROLE_" + INVENTORY);
    private final ItemRepository repository;

    public ApiItemController(ItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api")
    Mono<RepresentationModel<?>> root() {
        ApiItemController controller = methodOn(ApiItemController.class);

        Mono<Link> selfLink = linkTo(controller.root()).withSelfRel() //
                .toMono();

        Mono<Link> itemsAggregateLink = linkTo(controller.findAll(null)) //
                .withRel(IanaLinkRelations.ITEM) //
                .toMono();

        return Mono.zip(selfLink, itemsAggregateLink) //
                .map(links -> Links.of(links.getT1(), links.getT2())) //
                .map(links -> new RepresentationModel<>(links.toList()));
    }

    @GetMapping("/api/items")
    Mono<CollectionModel<EntityModel<Item>>> findAll(Authentication auth) {
        ApiItemController controller = methodOn(ApiItemController.class);

        Mono<Link> selfLink = linkTo(controller.findAll(auth)).withSelfRel().toMono();

        Mono<Links> allLinks;

        if (auth.getAuthorities().contains(ROLE_INVENTORY)) {
            Mono<Link> addNewLink = linkTo(controller.addNewItem(null, auth)).withRel("add").toMono();

            allLinks = Mono.zip(selfLink, addNewLink) //
                    .map(links -> Links.of(links.getT1(), links.getT2()));
        } else {
            allLinks = selfLink //
                    .map(link -> Links.of(link));
        }

        return allLinks //
                .flatMap(links -> this.repository.findAll() //
                        .flatMap(item -> findOne(item.getId(), auth)) //
                        .collectList() //
                        .map(entityModels -> CollectionModel.of(entityModels, links)));
    }

    @GetMapping("/api/items/{id}")
    Mono<EntityModel<Item>> findOne(@PathVariable String id, Authentication auth) {
        ApiItemController controller = methodOn(ApiItemController.class);

        Mono<Link> selfLink = linkTo(controller.findOne(id, auth)).withSelfRel() //
                .toMono();

        Mono<Link> aggregateLink = linkTo(controller.findAll(auth)) //
                .withRel(IanaLinkRelations.ITEM).toMono();

        Mono<Links> allLinks; // <1>

        if (auth.getAuthorities().contains(ROLE_INVENTORY)) { // <2>
            Mono<Link> deleteLink = linkTo(controller.deleteItem(id)).withRel("delete") //
                    .toMono();
            allLinks = Mono.zip(selfLink, aggregateLink, deleteLink) //
                    .map(links -> Links.of(links.getT1(), links.getT2(), links.getT3()));
        } else { // <3>
            allLinks = Mono.zip(selfLink, aggregateLink) //
                    .map(links -> Links.of(links.getT1(), links.getT2()));
        }

        return this.repository.findById(id) //
                .zipWith(allLinks) // <4>
                .map(o -> EntityModel.of(o.getT1(), o.getT2()));
    }

    @PreAuthorize("hasRole('" + INVENTORY + "')") // <1>
    @PostMapping("/api/items/add")
    Mono<ResponseEntity<?>> addNewItem(@RequestBody Item item, Authentication auth) { // <3>
        return this.repository.save(item) //
                .map(Item::getId) //
                .flatMap(id -> findOne(id, auth)) //
                .map(newModel -> ResponseEntity.created(newModel //
                        .getRequiredLink(IanaLinkRelations.SELF) //
                        .toUri()).build());
    }

    @PreAuthorize("hasRole('" + INVENTORY + "')")
    @DeleteMapping("/api/items/delete/{id}")
    Mono<ResponseEntity<?>> deleteItem(@PathVariable String id) {
        return this.repository.deleteById(id) //
                .thenReturn(ResponseEntity.noContent().build());
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
