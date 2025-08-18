package com.microservices.demo;

import org.apache.kafka.clients.producer.Callback;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;


public class ProducerWithKeyEx {

    private static final Logger log = LoggerFactory.getLogger(ProducerWithKeyEx.class.getSimpleName());

    public static void main(String[] args) throws InterruptedException {

        // 1. property 세팅
        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", "127.0.0.1:29092");

        properties.setProperty("key.serializer", StringSerializer.class.getName());
        properties.setProperty("value.serializer", StringSerializer.class.getName());

        // 2. producer 생성
        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);

        String topic = "demo_java3";

        // 3. record를 producer에 전용
        for (int j = 0; j < 2; j++) {
            for (int i = 0; i < 10; i++) {
                String key = "id_" + i;
                String value = "fastcampus_" + i;
                ProducerRecord<String, String> producerRecord =
                        new ProducerRecord<>(topic, key, value);
                producer.send(producerRecord, new Callback() {
                    @Override
                    public void onCompletion(RecordMetadata metadata, Exception exception) {
                        if (exception == null) {
                            log.info("KEy: " + key + "| Partition: " + metadata.partition());
                        } else {
                            log.error("error while producing", exception);
                        }
                    }
                });
            }
            Thread.sleep(500);
        }

        // 4. producer 종료
        producer.close();

    }
}
