package com.learnkafkastreams.topology;

import com.learnkafkastreams.domain.Alphabet;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.*;

import java.time.Duration;

@Slf4j
public class ExploreJoinsOperatorsTopology {


    public static String ALPHABETS = "alphabets"; // A => First letter in the english alphabet
    public static String ALPHABETS_ABBREVATIONS = "alphabets_abbreviations"; // A=> Apple


    public static Topology build(){
        StreamsBuilder streamsBuilder = new StreamsBuilder();

        joinKStreamWithKTable(streamsBuilder);
        return streamsBuilder.build();
    }

    private static void joinKStreamWithKTable(StreamsBuilder streamsBuilder) {
        var alphabetAbbreavation = streamsBuilder
                .stream(ALPHABETS_ABBREVATIONS,
                        Consumed.with(Serdes.String(), Serdes.String()));

        alphabetAbbreavation
                .print(Printed.<String, String>toSysOut().withLabel("alphabets_abbreviations"));

        var alphabetsTable = streamsBuilder
                .table(ALPHABETS,
                        Consumed.with(Serdes.String(), Serdes.String()),
                        Materialized.as("alphabets-store"));

        alphabetsTable
                .toStream()
                .print(Printed.<String, String>toSysOut().withLabel("alphabets"));

        ValueJoiner<String, String, Alphabet> valueJoiner = Alphabet::new;

        var joinedStream = alphabetAbbreavation
                .join(alphabetsTable, valueJoiner);

        joinedStream
                .print(Printed.<String, Alphabet>toSysOut().withLabel("alphabets-with-abbreviation"));

    }

}
