package guru.springframework.springaiintro.services;

import guru.springframework.springaiintro.model.Answer;
import guru.springframework.springaiintro.model.GetCapitalRequest;
import guru.springframework.springaiintro.model.Question;

public interface OpenAIService {
    Answer getAnswer(Question question);
    String getAnswer(String question);

    Answer getCapital(GetCapitalRequest getCapitalRequest);
}
