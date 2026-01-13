package guru.springframework.springaiaudio.services;

import guru.springframework.springaiaudio.model.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Created by jt, Spring Framework Guru.
 */
@RequiredArgsConstructor
@Service
public class OpenAIServiceImpl implements OpenAIService {


    @Override
    public byte[] getSpeech(Question question) {
        return new byte[0];
    }
}
