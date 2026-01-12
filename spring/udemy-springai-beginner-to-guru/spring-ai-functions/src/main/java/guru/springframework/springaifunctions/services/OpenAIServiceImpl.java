package guru.springframework.springaifunctions.services;


import guru.springframework.springaifunctions.model.Answer;
import guru.springframework.springaifunctions.model.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

/**
 * Created by jt, Spring Framework Guru.
 */
@RequiredArgsConstructor
@Service
public class OpenAIServiceImpl implements OpenAIService {

    final ChatModel chatModel;

    @Override
    public Answer getAnswer(Question question) {
       return new Answer("to-do implement me!");
    }
}
