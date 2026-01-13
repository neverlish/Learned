package guru.springframework.springaipromptengineering;

import org.junit.jupiter.api.Test;

import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.PromptTemplate;



/**
 * Created by jt, Spring Framework Guru.
 */
public class ChainOfThoughtTests extends BaseTestClass {

    /*
      Chain of thought - adding a series of intermediate reasoning steps to the prompt.
      See - https://arxiv.org/abs/2201.11903
     */
    @Test
    void testTraditionalPrompt() {
        String prompt = """
                Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls, each containing 3 balls.
                How many tennis balls does Roger have now?
                """.stripIndent();

        PromptTemplate promptTemplate = new PromptTemplate(prompt);

        ChatResponse response = chatModel.call(promptTemplate.create());

        //models previously would answer 27
        System.out.println(response.getResult().getOutput().getText());
    }

    @Test
    void testChainOfThroughPrompt() {
        String chainOfThoughtPrompt = """
                Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls, each containing 3 balls.
                How many tennis balls does Roger have now?
                
                A: Roger started with 5 balls. 2 cans of 3 balls each is 6 balls. 5 + 6 = 11. So Roger has 11 tennis balls.
                
                Q: The cafeteria had 23 apples originally. They used 20 apples to make lunch and bought 6 more. How many
                apples does the cafeteria have now?
                """.stripIndent();

        PromptTemplate promptTemplate = new PromptTemplate(chainOfThoughtPrompt);

        ChatResponse response = chatModel.call(promptTemplate.create());

        System.out.println(response.getResult().getOutput().getText());
    }

    @Test
    void testTraditionalPrompt2() {
        String prompt = """
                Alice left a glass of water outside overnight when the temperature was below freezing. The next morning, 
                she found the glass cracked. Explain step by step why the glass cracked.
                """.stripIndent();

        PromptTemplate promptTemplate = new PromptTemplate(prompt);

        ChatResponse response = chatModel.call(promptTemplate.create());

        //models previously would answer 27
        System.out.println(response.getResult().getOutput().getText());
    }
}
