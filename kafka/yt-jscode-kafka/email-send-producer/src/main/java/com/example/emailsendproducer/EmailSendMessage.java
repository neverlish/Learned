package com.example.emailsendproducer;

public class EmailSendMessage {
    private String from;
    private String to;
    private String subject;
    private String body;

    public EmailSendMessage(String from, String to, String subject, String body) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.body = body;
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
