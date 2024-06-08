package com.learnkafkastreams.topology;

import com.learnkafkastreams.domain.Greeting;
import com.learnkafkastreams.serdes.SerdesFactory;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.TestInputTopic;
import org.apache.kafka.streams.TestOutputTopic;
import org.apache.kafka.streams.TopologyTestDriver;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


class GreetingsTopologyTest {

    TopologyTestDriver topologyTestDriver = null;
    TestInputTopic<String, Greeting> inputTopic = null;
    TestOutputTopic<String, Greeting> outputTopic = null;

    @BeforeEach
    void setUp() {
        topologyTestDriver = new TopologyTestDriver(GreetingsTopology.buildTopology());
        inputTopic = topologyTestDriver.createInputTopic(GreetingsTopology.GREETINGS, Serdes.String().serializer(), SerdesFactory.greetingSerdesUsingGenerics().serializer());
        outputTopic = topologyTestDriver.createOutputTopic(GreetingsTopology.GREETINGS_UPPERCASE, Serdes.String().deserializer(), SerdesFactory.greetingSerdesUsingGenerics().deserializer());
    }

    @AfterEach
    void tearDown() {
        topologyTestDriver.close();
    }

    @Test
    void buildTopology() {
        inputTopic.pipeInput("GM", new Greeting("Good Morning!", LocalDateTime.now()));

        var count = outputTopic.getQueueSize();
        assertEquals(1, count);

        var outputValue = outputTopic.readKeyValue();
        assertEquals("GOOD MORNING!", outputValue.value.message());
        assertNotNull(outputValue.value.timestamp());

    }

    @Test
    void buildTopology_multipleInput() {
        var greeting1 = KeyValue.pair("GM", new Greeting("Good Morning!", LocalDateTime.now()));
        var greeting2 = KeyValue.pair("GN", new Greeting("Good Night!", LocalDateTime.now()));
        inputTopic.pipeKeyValueList(List.of(greeting1, greeting2));

        var count = outputTopic.getQueueSize();
        assertEquals(2, count);

        var outputValues = outputTopic.readKeyValuesToList();

        var outputValue1 = outputValues.get(0);
        assertEquals("GOOD MORNING!", outputValue1.value.message());
        assertNotNull(outputValue1.value.timestamp());

        var outputValue2 = outputValues.get(1);
        assertEquals("GOOD NIGHT!", outputValue2.value.message());
        assertNotNull(outputValue2.value.timestamp());
    }
}