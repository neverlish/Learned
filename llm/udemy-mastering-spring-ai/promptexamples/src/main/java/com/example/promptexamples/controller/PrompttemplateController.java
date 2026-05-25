package com.example.promptexamples.controller;

import com.example.promptexamples.dto.AIResponse;
import com.example.promptexamples.dto.ConceptRequest;
import com.example.promptexamples.dto.ExplainRequest;
import com.example.promptexamples.dto.ListRequest;
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

    @PostMapping("/list")
    public ResponseEntity<AIResponse> generateList(@RequestBody ListRequest request) {
        String response = promptTemplateService.generateList(
                request.count(),
                request.type(),
                request.topic()
        );

        return ResponseEntity.ok(new AIResponse(response));
    }

    @PostMapping("/explain-concept")
    public ResponseEntity<AIResponse> explainConcept(@RequestBody ConceptRequest request) {
        String response = promptTemplateService.explainConceptFromFile(
                request.concept(),
                request.level(),
                request.includeExamples()
        );

        return ResponseEntity.ok(new AIResponse(response));
    }
}
