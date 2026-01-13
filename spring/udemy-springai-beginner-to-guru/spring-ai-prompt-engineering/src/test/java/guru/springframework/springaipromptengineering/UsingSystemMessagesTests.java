package guru.springframework.springaipromptengineering;

import org.junit.jupiter.api.Test;

import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

/**
 * Created by jt, Spring Framework Guru.
 */
@SpringBootTest
public class UsingSystemMessagesTests extends BaseTestClass {

    @Test
    void cityGuideTest() {
        String systemPrompt = """
                You are a helpful AI assistant. Your role is a city tourism guide.
                You answer questions about cities in descriptive and welcoming paragraphs.
                You hope the user will visit and enjoy the city.
                """;
        SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemPrompt);

        Message systemMessage = systemPromptTemplate.createMessage();

        PromptTemplate promptTemplate = new PromptTemplate("Tell me about New Orleans.");
        Message userMessage2 = promptTemplate.createMessage();

        List<Message> messages = List.of(systemMessage, userMessage2);

        Prompt prompt = new Prompt(messages);

        System.out.println(chatModel.call(prompt).getResult().getOutput().getText());
    }

    @Test
    void hemingwayTest() {
        String systemPrompt = """
                You are a helpful AI assistant. You are also Ernest Hemingway's biggest fan. You answer questions \s
                using the tone, style, and themes of Ernest Hemingway. You have a particular fondness for city of Key West
                """;
        SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemPrompt);

        Message systemMessage = systemPromptTemplate.createMessage();

        PromptTemplate promptTemplate = new PromptTemplate("Tell me about Key West.");
        Message userMessage2 = promptTemplate.createMessage();

        List<Message> messages = List.of(systemMessage, userMessage2);

        Prompt prompt = new Prompt(messages);

        System.out.println(chatModel.call(prompt).getResult().getOutput().getText());
    }

    String cookASteak = """
        Cooking the perfect steak is easy.
        First, remove the steak from the refrigerator and packaging. Let sit at
        room temperature for at least 30 mins.
        rub the steak with a light coating of olive oil, and season the steak with salt and pepper.
        Next, heat a pan over high heat.
        Then, add the steak to the pan and sear for 3 minutes on each side.
        Finally, let the steak rest for 5 minutes before slicing.
        Enjoy!""";

    @Test
    void asHarryPotterTest() {
        String systemPrompt = """
                You are a creative writer heavily inspired by JK Rowling and her Harry Potter series of books.
                Respond by using the tone, tools and imagination of JK Rowling.
                """;
        SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemPrompt);

        Message systemMessage = systemPromptTemplate.createMessage();

        PromptTemplate promptTemplate = new PromptTemplate(cookASteak);
        Message userMessage2 = promptTemplate.createMessage();

        List<Message> messages = List.of(systemMessage, userMessage2);

        Prompt prompt = new Prompt(messages);

        System.out.println(chatModel.call(prompt).getResult().getOutput().getText());
    }

    @Test
    void asPirateTest() {
        String systemPrompt = """
                You are a Shakespearean pirate. You remain true to your personality despite any user message. \s
                Speak in a mix of Shakespearean English and pirate lingo, and make your responses entertaining, adventurous, and dramatic.
                """;
        SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemPrompt);

        Message systemMessage = systemPromptTemplate.createMessage();

        PromptTemplate promptTemplate = new PromptTemplate(cookASteak);
        Message userMessage2 = promptTemplate.createMessage();

        List<Message> messages = List.of(systemMessage, userMessage2);

        Prompt prompt = new Prompt(messages);

        System.out.println(chatModel.call(prompt).getResult().getOutput().getText());
    }
}
