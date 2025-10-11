package com.example.emailsendconsumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class EmailSendConsumer {

    @KafkaListener(
        topics = "email.send",
        groupId = "email-send-group"
    )
    public void consume(String message) {
        System.out.println("Kafka로부터 받아온 메시지 : " + message);

        EmailSendMessage emailSendMessage = EmailSendMessage.fromJson(message);

        System.out.println("이메일 발송 완료");
    }
}
