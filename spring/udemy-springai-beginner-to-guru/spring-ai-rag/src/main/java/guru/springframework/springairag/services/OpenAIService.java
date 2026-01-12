package guru.springframework.springairag.services;

import guru.springframework.springairag.model.Answer;
import guru.springframework.springairag.model.Question;

public interface OpenAIService {

    Answer getAnswer(Question question);
}