package com.learnkafkastreams.topology;

import com.learnkafkastreams.domain.Alphabet;
import com.learnkafkastreams.serdes.SerdesFactory;
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

//        joinKStreamWithKTable(streamsBuilder);
//        joinKStreamWithGlobalKTable(streamsBuilder);
//        joinKTableWithKTable(streamsBuilder);
        joinKStreamsWithKStreams(streamsBuilder);
        return streamsBuilder.build();
    }

    private static void joinKStreamsWithKStreams(StreamsBuilder streamsBuilder) {
        var alphabetAbbreavation = streamsBuilder
                .stream(ALPHABETS_ABBREVATIONS,
                        Consumed.with(Serdes.String(), Serdes.String()));

        alphabetAbbreavation
                .print(Printed.<String, String>toSysOut().withLabel("alphabets_abbreviations"));

        var alphabetsStream = streamsBuilder
                .stream(ALPHABETS,
                        Consumed.with(Serdes.String(), Serdes.String()));

        alphabetsStream
                .print(Printed.<String, String>toSysOut().withLabel("alphabets"));

        ValueJoiner<String, String, Alphabet> valueJoiner = Alphabet::new;

        var fiveSecondWindow = JoinWindows.ofTimeDifferenceWithNoGrace(Duration.ofSeconds(5));

        var joinedParams = StreamJoined.with(Serdes.String(), Serdes.String(), Serdes.String());

        var joinedStream = alphabetAbbreavation
                .outerJoin(alphabetsStream,
                        valueJoiner,
                        fiveSecondWindow,
                        joinedParams);

        joinedStream
                .print(Printed.<String, Alphabet>toSysOut().withLabel("alphabets_alphabets_abbreviation-kstream"));
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

    private static void joinKTableWithKTable(StreamsBuilder streamsBuilder) {
        var alphabetAbbreavation = streamsBuilder
                .table(ALPHABETS_ABBREVATIONS,
                        Consumed.with(Serdes.String(), Serdes.String()),
                        Materialized.as("alphabets_abbreviations-store"));

        alphabetAbbreavation
                .toStream()
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
                .toStream()
                .print(Printed.<String, Alphabet>toSysOut().withLabel("alphabets-with-abbreviation"));

    }


    private static void joinKStreamWithGlobalKTable(StreamsBuilder streamsBuilder) {
        var alphabetAbbreavation = streamsBuilder
                .stream(ALPHABETS_ABBREVATIONS,
                        Consumed.with(Serdes.String(), Serdes.String()));

        alphabetAbbreavation
                .print(Printed.<String, String>toSysOut().withLabel("alphabets_abbreviations"));

        var alphabetsTable = streamsBuilder
                .globalTable(ALPHABETS,
                        Consumed.with(Serdes.String(), Serdes.String()),
                        Materialized.as("alphabets-store"));

//        alphabetsTable
//                .toStream()
//                .print(Printed.<String, String>toSysOut().withLabel("alphabets"));

        ValueJoiner<String, String, Alphabet> valueJoiner = Alphabet::new;

        KeyValueMapper<String, String, String> keyValueMapper = (leftKey, rightKey) -> leftKey;

        var joinedStream = alphabetAbbreavation
//                .join(alphabetsTable, valueJoiner)
                .join(alphabetsTable, keyValueMapper, valueJoiner);

        joinedStream
                .print(Printed.<String, Alphabet>toSysOut().withLabel("alphabets-with-abbreviation"));

    }

}
