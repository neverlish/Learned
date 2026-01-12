package guru.springframework.springaiimage.services;


import guru.springframework.springaiimage.model.Question;

public interface OpenAIService {

    byte[] getImage(Question question);
}
