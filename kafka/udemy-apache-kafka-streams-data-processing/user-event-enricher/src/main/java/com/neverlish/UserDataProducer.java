package com.neverlish;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;
import java.util.concurrent.ExecutionException;

public class UserDataProducer {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        Properties properties = new Properties();
        properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:19092");
        properties.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.setProperty(ProducerConfig.ACKS_CONFIG, "all");
        properties.setProperty(ProducerConfig.RETRIES_CONFIG, "3");
        properties.setProperty(ProducerConfig.LINGER_MS_CONFIG, "1");
        properties.setProperty(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");

        Producer<String, String> producer = new KafkaProducer<>(properties);

        System.out.println("\nExample 1 - new user\n");
        producer.send(userRecord("john", "First=John,Last=Doe,Email=john.doe@gmail.com")).get();
        producer.send(purchaseRecord("john", "Apples and Bananas (1)")).get();

        Thread.sleep(100);

        System.out.println("\nExample 2 - non existing user\n");
        producer.send(purchaseRecord("bob", "Kafka Udemy Course (2)")).get();

        Thread.sleep(100);

        System.out.println("\nExample 3 - update user\n");
        producer.send(userRecord("john", "First=Johnny,Last=Doe,Email=johnny.doe@gmail.com")).get();
        producer.send(purchaseRecord("john", "Oranges (3)")).get();

        Thread.sleep(100);

        System.out.println("\nExample 4 - non existing user then user\n");
        producer.send(purchaseRecord("stephane", "Computer (4)")).get();
        producer.send(userRecord("stephane", "First=Stephane,Last=Maarek,Github=simplesteph")).get();
        producer.send(purchaseRecord("stephane", "Books (4)")).get();
        producer.send(userRecord("stephane", null)).get();

        Thread.sleep(100);

        System.out.println("\nExample 5 - user then delete then data\n");

        producer.send(userRecord("alice", "First=Alice")).get();
        producer.send(userRecord("alice", null)).get();
        producer.send(purchaseRecord("alice", "Apache Kafka Series (5)")).get();

        Thread.sleep(100);

        System.out.println("End of demo");
        producer.close();
    }

    private static ProducerRecord<String, String> userRecord(String key, String value) {
        return new ProducerRecord<>("user-table", key, value);
    }

    private static ProducerRecord<String, String> purchaseRecord(String key, String value) {
        return new ProducerRecord<>("user-purchases", key, value);
    }
}
