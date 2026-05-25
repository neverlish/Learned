package com.example.springai_redis_vector_search.controller;

import com.example.springai_redis_vector_search.model.ChatResponse;
import com.example.springai_redis_vector_search.model.UploadResponse;
import com.example.springai_redis_vector_search.service.DocumentService;
import com.example.springai_redis_vector_search.service.DocumentTracker;
import com.example.springai_redis_vector_search.service.RagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class RagController {

    private static final Logger log = LoggerFactory.getLogger(RagController.class);

    private final DocumentService documentService;
    private final RagService ragService;
    private final DocumentTracker documentTracker;

    public RagController(DocumentService documentService, RagService ragService, DocumentTracker documentTracker) {
        this.documentService = documentService;
        this.ragService = ragService;
        this.documentTracker = documentTracker;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("indexedDocs", documentTracker.getAll());
        model.addAttribute("hasDocuments", documentTracker.hasDocuments());
        model.addAttribute("pageTitle", "RAG Document Q&A");
        return "index";
    }

    @PostMapping("/upload")
    @ResponseBody
    public UploadResponse uploadDocument(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new UploadResponse(false, "Please select a file to upload.", null, 0);
        }

        String fileName = file.getOriginalFilename();
        String lowerName = fileName != null ? fileName.toLowerCase() : "";

        if (!lowerName.endsWith(".pdf") && !lowerName.endsWith(".txt") && !lowerName.endsWith(".docx")) {
            return new UploadResponse(false, "Unsupported file type. Please upload PDF, TXT, or DOCX.", fileName, 0);
        }

        try {
            int chunks = documentService.ingestDocument(file);
            documentTracker.track(fileName, chunks);
            return new UploadResponse(true,
                    "Document indexed successfully! " + chunks + " chunks stored.",
                    fileName, chunks);
        } catch (Exception e) {
            log.error("Error uploading document: {}", e.getMessage(), e);
            return new UploadResponse(false, "Error processing document: " + e.getMessage(), fileName, 0);
        }
    }

    @PostMapping("/ask")
    public String ask(@RequestParam("question") String question, Model model) {
        if (question == null || question.isBlank()) {
            model.addAttribute("error", "Please enter a question.");
            model.addAttribute("indexedDocs", documentTracker.getAll());
            model.addAttribute("hasDocuments", documentTracker.hasDocuments());
            return "index";
        }

        try {
            ChatResponse response = ragService.answer(question);
            model.addAttribute("response", response);
            model.addAttribute("indexedDocs", documentTracker.getAll());
            model.addAttribute("hasDocuments", documentTracker.hasDocuments());
        } catch (Exception e) {
            log.error("Error answering question: {}", e.getMessage(), e);
            model.addAttribute("error", "Error generating answer: " + e.getMessage());
            model.addAttribute("indexedDocs", documentTracker.getAll());
            model.addAttribute("hasDocuments", documentTracker.hasDocuments());
        }

        return "result";
    }

    @GetMapping("/ask")
    public String askPage() {
        return "redirect:/";
    }
}


