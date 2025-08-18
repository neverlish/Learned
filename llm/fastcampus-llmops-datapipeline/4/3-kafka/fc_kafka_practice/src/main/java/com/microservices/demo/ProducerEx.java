package com.microservices.demo;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;


public class ProducerEx {


    public static void main(String[] args) {

        // 1. property 세팅
        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", "127.0.0.1:29092");

        properties.setProperty("key.serializer", StringSerializer.class.getName());
        properties.setProperty("value.serializer", StringSerializer.class.getName());

        // 2. producer 생성
        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);

        // 3. record 전송
        ProducerRecord<String, String> producerRecord = new ProducerRecord<>("demo_java", "fastcampus");
        producer.send(producerRecord);

        // 4. close
        producer.close();

    }
}
