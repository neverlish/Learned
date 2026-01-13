package guru.springframework.springaipromptengineering;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Created by jt, Spring Framework Guru.
 */
@SpringBootTest
public class BaseTestClass {

    @Autowired
    ChatModel chatModel;

    String chat(String prompt) {
        PromptTemplate promptTemplate = new PromptTemplate(prompt);
        Prompt promptToSend = promptTemplate.create();

        return chatModel.call(promptToSend).getResult().getOutput().getText();
    }

}
