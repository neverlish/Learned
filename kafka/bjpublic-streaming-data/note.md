# 9.2 메시지 큐 단계
    
## 9.2.1 카프카 설정 및 설치
- curl -O https://archive.apache.org/dist/kafka/3.7.0/kafka_2.13-3.7.0.tgz
- tar -xzf kafka_2.13-3.7.0.tgz
- cd kafka_2.13-3.7.0
  - bin/zookeeper-server-start.sh -daemon config/zookeeper.properties
  - bin/kafka-server-start.sh -daemon config/server.properties
  - bin/kafka-topics.sh --bootstrap-server localhost:9092 --create -topic meetup-raw-rsvps --partitions 1 --replication-factor 1
  - bin/kafka-topics.sh --bootstrap-server localhost:9092 --list

## 9.2.2 수집 단계 애플리케이션과 카프카 연동
- bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic meet-up-raw-rsvps
- cd collection-service
  - mvn clean package
  - jara -jar target/collection-service-0.1.1