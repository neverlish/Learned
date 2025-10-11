package com.example.emailsendconsumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.retry.annotation.Backoff;
import org.springframework.stereotype.Service;

@Service
public class EmailSendConsumer {

    @KafkaListener(
        topics = "email.send",
        groupId = "email-send-group"
    )
    @RetryableTopic(
        attempts = "5",
        backoff = @Backoff(delay = 1000, multiplier = 2)
    )
    public void consume(String message) {
        System.out.println("Kafka로부터 받아온 메시지 : " + message);

        EmailSendMessage emailSendMessage = EmailSendMessage.fromJson(message);

        if (emailSendMessage.getTo().equals("fail@naver.com")) {
            System.out.println("잘못된 이메일 주소로 인해 발송 실패");
            throw new RuntimeException("잘못된 이메일 주소로 인해 발송 실패");
        }

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException("이메일 발송 실패");
        }

        System.out.println("이메일 발송 완료");
    }
}
