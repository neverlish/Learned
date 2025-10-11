package com.example.emailsendproducer;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emails")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> sendEmail(
        @RequestBody SendEmailRequestDto sendEmailRequestDto
    ) {
        emailService.sendEmail(sendEmailRequestDto);
        return ResponseEntity.ok("이메일 발송 요청 완료");
    }
}
