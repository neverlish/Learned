# 1.4 AWS EC2에 Kafka 설치 실행하기

- sudo apt update
- sudo apt install openjdk-17-jdk
- java -version

- wget https://dlcdn.apache.org/kafka/4.0.0/kafka_2.13-4.0.0.tgz
- tar -xzf kafka_2.13-4.0.0.tgz
- cd kafka_2.13-4.0.0

- export KAFKA_HEAP_OPTS="-Xmx400m -Xms400m"
- sudo dd if=/dev/zero of=/swapfile bs=128M count=16
- sudo chmod 600 /swapfile
- sudo mkswap /swapfile
- sudo swapon /swapfile
- sudo vi /etc/fstab
  - /swapfile swap swap default 0 0
- free

- vi config/server.properties

  - advertised.listeners=PLAINTEXT://{PUBLIC_IP}:9092,CONTROLLER://{PUBLIC_IP}:9093

- KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
- bin/kafka-storage.sh format -standalone -t $KAFKA_CLUSTER_ID -c config/server.properties

- bin/kafka-server-start.sh config/server.properties
- bin/kafka-server-start.sh -daemon config/server.properties

- tail -f logs/kafkaServer.out

- sudo lsof -i:9092

- bin/kafka-server-stop.sh

# 2.2 토픽 생성하기 조회하기 삭제하기

- bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic email.send
- bin/kafka-topics.sh --bootstrap-server localhost:9092 --list
- bin/kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic email.send
- bin/kafka-topics.sh --bootstrap-server localhost:9092 --delete --topic email.send

# 2.3 Kafka에 메시지 넣기 Kafka에서 메시지 조회하기

- bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic email.send
- bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic email.send
  > hello1
  > hello2
  > hello3
- bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic email.send --from-beginning

# 2.4 메시지를 어디까지 읽었는 지 기억하고, 그 다음 메시지부터 처리하기 (Consumer Group, Offset)

- bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic email.send --from-beginning --group email-send-group
- bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
- bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group email-send-group --describe

# 2.7 [실습] Spring Boot가 Kafka에 메시지 잘 넣는 지 테스트해보기

- bin/kafka-topics.sh --bootstrap-server localhost:9092 --list
- bin/kafka-topics.sh --bootstrap-server localhost:9092 --delete --topic email.send
- bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
- bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --delete --group email-send-group
- bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic email.send

# 3.2 [실습] Spring Boot로 Kafka에서 재시도조차 실패한 메시지를 따로 보관하기 (DLT, Dead Letter Topic)

- bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic email.send.dlt --from-beginning
