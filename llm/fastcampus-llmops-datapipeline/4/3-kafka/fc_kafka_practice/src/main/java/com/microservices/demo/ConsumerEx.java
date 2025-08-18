package com.microservices.demo;


import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class ConsumerEx {

    private static final Logger log = LoggerFactory.getLogger(ConsumerEx.class.getSimpleName());

    public static void main(String[] args) {

        String groupId = "my-java-application";
        String topic = "demo_java";

        // 1. property 세팅
        Properties properties = new Properties();

        // connect
        properties.setProperty("bootstrap.servers", "127.0.0.1:29092");

        // consumer 설정
        properties.setProperty("key.deserializer", StringDeserializer.class.getName());
        properties.setProperty("value.deserializer", StringDeserializer.class.getName());
        properties.setProperty("group.id", groupId);
        properties.setProperty("auto.offset.reset", "latest");

        // 2. consumer 생성
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties);

        // 3. topic 구독
        consumer.subscribe(Arrays.asList(topic));

        // 4. topic으로부터 데이터 consume
        while (true) {
            log.info("Polling");
            ConsumerRecords<String, String> records =
                    consumer.poll(Duration.ofMillis(1000));

            for (ConsumerRecord<String, String> record : records) {
                log.info("Key: " + record.key() + ", Value: " + record.value());
                log.info("Partition: " + record.partition() + ", Offset: " + record.offset());
            }
        }
    }
}