package guru.springframework.springaiaudio.services;


import guru.springframework.springaiaudio.model.Question;

/**
 * Created by jt, Spring Framework Guru.
 */
public interface OpenAIService {


    byte[] getSpeech(Question question);
}
