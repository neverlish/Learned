package com.greglturnquist.hackingspringbootreactive;

import org.springframework.data.repository.query.ReactiveQueryByExampleExecutor;

public interface ItemByExampleRepository extends ReactiveQueryByExampleExecutor<Item> {

}
