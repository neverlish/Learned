package com.example.emailsendconsumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EmailSendMessage {
    private String from;
    private String to;
    private String subject;
    private String body;

    public EmailSendMessage() {
    }

    public EmailSendMessage(String from, String to, String subject, String body) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.body = body;
    }

    public static EmailSendMessage fromJson(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, EmailSendMessage.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Json 파싱 실패");
        }
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public String getSubject() {
        return subject;
    }

    public String getBody() {
        return body;
    }
}
