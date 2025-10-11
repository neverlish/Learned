package com.example.emailsendproducer;

public class SendEmailRequestDto {
    private String from;
    private String to;
    private String subject;
    private String body;

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
