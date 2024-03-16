package io.conduktor.demos.kafka;

import org.apache.kafka.clients.producer.Callback;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

public class ProducerDemoKeys {
    private static final Logger log = LoggerFactory.getLogger(ProducerDemoKeys.class.getSimpleName());

    public static void main(String[] args) {
        log.info("I am a Kafka Producer!");

        Properties properties = new Properties();
        properties.put("bootstrap.servers", "https://open-basilisk-9789-us1-kafka.upstash.io:9092");
        properties.put("sasl.mechanism", "SCRAM-SHA-256");
        properties.put("sasl.jaas.config", "org.apache.kafka.common.security.scram.ScramLoginModule required username=\"b3Blbi1iYXNpbGlzay05Nzg5JGqXb_ET2mUXYti672e5QIOs6VrUeXQ21v73YgE\" password=\"NDBmNzFlMWYtM2M5Ny00N2RkLTkwYmItNGRkZjlmZWQ0NDIw\";");
        properties.put("security.protocol", "SASL_SSL");
        properties.put("key.serializer", StringSerializer.class.getName());
        properties.put("value.serializer", StringSerializer.class.getName());


        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);

        for (int j = 0; j < 2; j++) {
            for (int i = 0; i < 10; i++) {
                String topic = "demo_java";
                String key = "id_" + i;
                String value = "hello world " + i;
                ProducerRecord<String, String> producerRecord = new ProducerRecord<>(topic, key, value);
                producer.send(producerRecord, new Callback() {
                    @Override
                    public void onCompletion(RecordMetadata metadata, Exception e) {
                        if (e == null) {
                            log.info("Key: " + key + " | Partition: " + metadata.partition());
                        } else {
                            log.error("Error while producing", e);
                        }
                    }
                });
            }

            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        producer.flush();

        producer.close();
    }
}
