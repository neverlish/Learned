package com.example.promptexamples.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.template.st.StTemplateRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PromptTemplateService {
    private final ChatClient chatClient;

    @Value("classpath:/prompts/explain-concept.st")
    private Resource explainConceptTemplate;

    public PromptTemplateService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String explainTopic(String topic, String level) {
        String template = "Explain {topic} to a {level} developer in simple terms";

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Prompt prompt = promptTemplate.create(Map.of(
            "topic", topic,
            "level", level
        ));

        return chatClient.prompt(prompt).call().content();
    }

    public String generateList(String count, String type, String topic) {
        String template = "List {count} {type} for {topic}. Provide brief description";

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Prompt prompt = promptTemplate.create(Map.of(
            "count", count,
            "type", type,
            "topic", topic
        ));

        return chatClient.prompt(prompt).call().content();
    }

    public String explainConceptFromFile(String concept, String level, boolean includeExampes) {
        PromptTemplate promptTemplate = new PromptTemplate(explainConceptTemplate);

        Prompt prompt = promptTemplate.create(Map.of(
                "concept", concept,
                "level", level,
                "examples", includeExampes ? "yes" : "no"
        ));

        return chatClient.prompt(prompt).call().content();
    }

    public String generateJsonResponse(String name, String role, String department, String level) {
        String template = """
            Generate a JSON response for a user profile:
            {
                "name": "<n>",
                "role": "<r>",
                "department": "<dept>",
                "level": "<lv>",
                "skills": ["<skill1>", "<skill2>", "<skill3>"]
            }
            Return ONLY valid JSON.
            """;

        PromptTemplate promptTemplate = PromptTemplate.builder()
                .renderer(StTemplateRenderer.builder()
                        .startDelimiterToken('<')
                        .endDelimiterToken('>')
                        .build())
                .template(template)
                .build();

        String renderedPrompt = promptTemplate.render(Map.of(
                "n", name,
                "r", role,
                "dept", department,
                "lv", level,
                "skill1", "Java",
                "skill2", "Spring Boot",
                "skill3", "Microservices"
        ));

        return chatClient.prompt(renderedPrompt).call().content();
    }
}
