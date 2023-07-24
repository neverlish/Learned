package com.greglturnquist.hackingspringbootreactive;

import org.springframework.data.repository.CrudRepository;

public interface BlockingItemRepository extends CrudRepository<Item, String> {
}
