package com.greglturnquist.hackingspringbootreactive;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class SpringAmqpItemService {
    private static final Logger log = LoggerFactory.getLogger(SpringAmqpItemService.class);

    private final ItemRepository repository;

    public SpringAmqpItemService(ItemRepository repository) {
        this.repository = repository;
    }

    @RabbitListener(
        ackMode = "MANUAL",
        bindings = @QueueBinding(
            value = @Queue,
            exchange = @Exchange("hacking-spring-boot"),
            key = "new-items-spring-amqp"
        )
    )
    public Mono<Void> processNewItemsViaSpringAmqp(Item item) {
        log.debug("Consuming => " + item);
        return this.repository.save(item).then();
    }
}
