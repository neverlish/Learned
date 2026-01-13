package guru.springframework.springaiimage.services;


import guru.springframework.springaiimage.model.Question;
import org.springframework.web.multipart.MultipartFile;

public interface OpenAIService {

    byte[] getImage(Question question);

    String getDescription(MultipartFile file);
}
