package guru.springframework.springaiimage.services;


import guru.springframework.springaiimage.model.Question;

public interface OpenAIService {

    Object getImage(Question question);
}
