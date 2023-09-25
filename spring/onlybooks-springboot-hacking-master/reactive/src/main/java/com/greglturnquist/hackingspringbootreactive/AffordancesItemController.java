package com.greglturnquist.hackingspringbootreactive;

import org.springframework.hateoas.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import static org.springframework.hateoas.mediatype.alps.Alps.*;
import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@RestController
public class AffordancesItemController {
    private final ItemRepository repository;

    public AffordancesItemController(ItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/affordances/items")
    Mono<CollectionModel<EntityModel<Item>>> findAll() {
        AffordancesItemController controller = methodOn(AffordancesItemController.class);

        Mono<Link> aggregateRoot = linkTo(controller.findAll()) //
                .withSelfRel() //
                .andAffordance(controller.addNewItem(null)) // <1>
                .toMono();

        return this.repository.findAll() // <2>
                .flatMap(item -> findOne(item.getId())) // <3>
                .collectList() // <4>
                .flatMap(models -> aggregateRoot //
                        .map(selfLink -> CollectionModel.of( //
                                models, selfLink))); // <5>
    }

    @GetMapping("/affordances/items/{id}") // <1>
    Mono<EntityModel<Item>> findOne(@PathVariable String id) {
        AffordancesItemController controller = methodOn(AffordancesItemController.class); // <2>

        Mono<Link> selfLink = linkTo(controller.findOne(id)) //
                .withSelfRel() //
                .andAffordance(controller.updateItem(null, id)) // <3>
                .toMono();

        Mono<Link> aggregateLink = linkTo(controller.findAll()) //
                .withRel(IanaLinkRelations.ITEM) //
                .toMono();

        return Mono.zip(repository.findById(id), selfLink, aggregateLink) //
                .map(o -> EntityModel.of(o.getT1(), Links.of(o.getT2(), o.getT3())));
    }

    @PostMapping("/affordances/items") // <1>
    Mono<ResponseEntity<?>> addNewItem(@RequestBody Mono<EntityModel<Item>> item) { // <2>
        return item //
                .map(EntityModel::getContent) // <3>
                .flatMap(this.repository::save) // <4>
                .map(Item::getId) // <5>
                .flatMap(this::findOne) // <6>
                .map(newModel -> ResponseEntity.created(newModel // <7>
                        .getRequiredLink(IanaLinkRelations.SELF) //
                        .toUri()).body(newModel.getContent()));
    }

    @PutMapping("/affordances/items/{id}")
    public Mono<ResponseEntity<?>> updateItem(@RequestBody Mono<EntityModel<Item>> item, @PathVariable String id) {
        return item
                .map(EntityModel::getContent)
                .map(content -> new Item(id, content.getName(), content.getDescription(), content.getPrice()))
                .flatMap(this.repository::save)
                .then(findOne(id))
                .map(model -> ResponseEntity.noContent()
                        .location(model.getRequiredLink(IanaLinkRelations.SELF).toUri()).build());
    }
}
