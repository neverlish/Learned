package com.learnkafkastreams.producer;

import com.learnkafkastreams.domain.HostInfo;
import com.learnkafkastreams.domain.HostInfoWithKey;
import org.apache.kafka.common.serialization.Serdes;
import org.springframework.kafka.config.StreamsBuilderFactoryBean;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MetaDataService {
    private final StreamsBuilderFactoryBean streamsBuilderFactoryBean;

    public MetaDataService(StreamsBuilderFactoryBean streamsBuilderFactoryBean) {
        this.streamsBuilderFactoryBean = streamsBuilderFactoryBean;
    }

    public List<HostInfo> getStreamsMetadata() {
        return streamsBuilderFactoryBean
                .getKafkaStreams()
                .metadataForAllStreamsClients()
                .stream()
                .map(streamsMetadata -> {
                    var hostInfo = streamsMetadata.hostInfo();
                    return new HostInfo(hostInfo.host(), hostInfo.port());
                })
                .collect(Collectors.toList());
    }

    public HostInfoWithKey getStreamsMetaData(String storeName, String locationId) {
        var metaDataForKey = streamsBuilderFactoryBean
                .getKafkaStreams()
                .queryMetadataForKey(storeName, locationId, Serdes.String().serializer());

        if (metaDataForKey != null) {
            var activeHost = metaDataForKey.activeHost();
            return new HostInfoWithKey(activeHost.host(), activeHost.port(), locationId);
        }

        return null;
    }

}
