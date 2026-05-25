package com.example.promptexamples.controller;

import com.example.promptexamples.dto.AIResponse;
import com.example.promptexamples.dto.ExplainRequest;
import com.example.promptexamples.service.PromptTemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prompts")
public class PrompttemplateController {
    private final PromptTemplateService promptTemplateService;

    public PrompttemplateController(PromptTemplateService promptTemplateService) {
        this.promptTemplateService = promptTemplateService;
    }

    @PostMapping("/explain")
    public ResponseEntity<AIResponse> explainTopic(@RequestBody ExplainRequest request) {
        String response = promptTemplateService.explainTopic(
            request.topic(),
            request.level()
        );

        return ResponseEntity.ok(new AIResponse(response));
    }
}
