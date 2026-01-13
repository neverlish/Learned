package guru.springframework.springaiaudio.controllers;


import guru.springframework.springaiaudio.model.Question;
import guru.springframework.springaiaudio.services.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by jt, Spring Framework Guru.
 */
@RequiredArgsConstructor
@RestController
public class QuestionController {

    private final OpenAIService openAIService;

    @PostMapping(value = "/talk", produces = "audio/mpeg")
    public byte[] talkTalk(@RequestBody Question question) {
        return openAIService.getSpeech(question);
    }

}
