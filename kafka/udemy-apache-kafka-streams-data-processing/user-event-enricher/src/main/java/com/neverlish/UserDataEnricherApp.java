package com.neverlish;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.GlobalKTable;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.KStreamBuilder;

import java.util.Properties;

public class UserDataEnricherApp {
    public static void main(String[] args) {
        Properties config = new Properties();
        config.put(StreamsConfig.APPLICATION_ID_CONFIG, "user-event-enricher-app");
        config.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:19092");
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        config.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        config.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        KStreamBuilder builder = new KStreamBuilder();

        GlobalKTable<String, String> userTable = builder.globalTable(Serdes.String(), Serdes.String(), "user-table");
        KStream<String, String> userPurchases = builder.stream(Serdes.String(), Serdes.String(), "user-purchases");
        KStream<String, String> userPurchasesEnrichedJoin =
                userPurchases.join(userTable,
                        (key, value) -> key,
                        (purchase, userInfo) -> "Purchase=" + purchase + ",UserInfo=[" + userInfo + "]"
                );

        userPurchasesEnrichedJoin.to("user-purchases-enriched-inner-join");

        KStream<String, String> userPurchasesEnrichedLeftJoin =
                userPurchases.leftJoin(userTable,
                        (key, value) -> key,
                        (purchase, userInfo) -> {
                            if (userInfo != null) {
                                return "Purchase=" + purchase + ",UserInfo=[" + userInfo + "]";
                            } else {
                                return "Purchase=" + purchase + ",UserInfo=null";
                            }
                        }
                );

        userPurchasesEnrichedLeftJoin.to("user-purchases-enriched-left-join");

        KafkaStreams streams = new KafkaStreams(builder, config);
        streams.cleanUp();
        streams.start();

        System.out.println(streams.toString());

        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
    }
}