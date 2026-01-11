package guru.springframework.springaipromptengineering;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

/**
 * Created by jt, Spring Framework Guru.
 */
@SpringBootTest
public class InferenceTests extends BaseTestClass {

    //Using AI to infer the sentiment of a review or topic

    String review1 = """
            I recently purchased the Stanley 40oz Tumbler in the vibrant Citron color, and I am thoroughly impressed with its performance in every aspect. From its sleek design to its remarkable durability and easy washability, this tumbler has quickly become my go-to companion for all my hydration needs.
                        
            First and foremost, the Citron color is absolutely stunning. It's bright, cheerful, and adds a pop of personality to my everyday routine. Whether I'm sipping on my flavored water or staying hydrated during a busy work shift, this tumbler stands out in the best way possible.
                        
            In terms of durability, the Stanley 40oz Tumbler exceeds expectations. Constructed from high-quality stainless steel, it's built to withstand the rigors of daily use and outdoor adventures. I've accidentally dropped it a few times, and not a dent or scratch in sight! Plus, it's dishwasher safe, making cleanup a breeze after a long day.
                        
            What truly sets this tumbler apart is its sleek and functional design. The slim profile fits perfectly in my hand and cup holder, while the double-wall vacuum insulation keeps my beverages hot or cold for hours on end. Whether I'm enjoying a piping hot cup of hot cocoa or a refreshing cold drink, the Stanley tumbler delivers every time.
                        
            Overall, I highly recommend the Stanley 40oz Tumbler in Citron to anyone in search of a stylish, durable, and functional hydration solution. It's the perfect companion for any adventure, and its easy washability ensures that it will remain a staple in my daily routine for years to come.""";

    String review2 = """
            OK, I'm sure you pros out there are doing just fine but after years of thermometering and instant thermometering and testing and tasting, I've not gotten out of all the cooking what I wanted or expected; I couldn't even get decent poached chicken no matter the methodology laid out (lol). But here comes an unexpected life saver: Combustion Predictive Thermometer & Display. Wow! Looked it up and it said it could be used for baked goods. Wife's pumpkin loaf was the first test and never has it turned out so good. Next, a bison steak (which I got in a swap deal); again, smashing success. Next, my nemesis: chicken breast. Yeah, you do it right and it's TENDER. The predicative feature is very successful doing its thing. There's an unexpected side bene: you get to see how what you're doing is going and, as a result, you may make changes to cooking times with more confidence. Last example: some top sirloin (hey, it was on sale): best ever nailing the desired doneness. of medium rare. The app is easy to use and the bluetooth worked fine but I was fairly close. Since there's cooking intelligence lacking at this end, some "thermometer AI" is more than welcome. P.S. be sure you read all material carefully, Be sure you understand the marker lines on the thermometer. The info is all there but it could probably do with an edit. Oh, and do the software upgrades.""";

    String review3 = """
            I wanted to like this product but it just lost connection way too many times.\s""";

    String review4 = """
            Había leído comentarios de otro comprador que tuvo el mismo problema, en la publicación específica que es de 40 Oz y te llega uno de 30 oz, el producto es de buena calidad pero no es lo se específica en la publicación""";

    String review5 = """
            I get it. Everyone is buying these now after years of not caring about Stanley tumblers because of social media. The problem with viral crap like this is we get caught up in fitting in and jumping on the band wagon that we fail to see what's wrong with a product before buying it.
            THIS TUMBLER IS NOT LEAK PROOF. It's not even a little resistent to leaking. Even if you have the top fully closed and the straw taken out, the liquid inside will leak out like crazy if you tip it over even slightly. To me, if I'm going to carry around 30-40oz of hot or cold liquids then the tumbler MUST prevent said liquids from coming out. I understand it's not a water bottle, but that's a lame technicality that Stanley shouldn't cling to. At a MINIMUM the tumbler should be leak proof if I take out the straw and close the top. Furthermore, the sip top closing mechanism seems very flimsy and can be easily bended out of place, so beware of turning it too hard or especially dropping your tumbler.
            I am highly disappointed for being sucked into thinking this was a reliable tumbler that would replace others I have. Granted they are not as nice looking, but they do the job of holding AND containing the water I take with me all day to and from work in NYC.
            I do NOT recommend this tumbler and I would suggest that Stanley fix these important issues instead of focusing on more colors and patterns.""";

    String review6 = """
            Newsflash: After all the hype surrounding this insulated tumbler, I finally decided to purchase one. Unfortunately, after two days, I happened upon an article on Google about these tumblers when I noticed one particular word that caught my attention in the title...Lead! I read the article in which the company admitted to using lead as part of the sealing agent that helps seal and insulate the tumbler. I was instantly mortified at what I just read and informed my mother about the article because she had purchase one right after me. I was shocked that Stanley would keep this a secret for so long after selling what I would think possibly several thousand of these insulated tumblers. Staying healthy is hard enough without a company feeding me a product with lead in it! The nerve and dare I say audacity of this company after so many incidents involving lead in this country affecting children especially. Needless to say I will be returning this item post haste and will not be purchasing another Stanley product anytime soon or maybe even ever!""";

    String sentimentPrompt = """
            Determine the sentiment of the following reviews and provide a brief summary of each review.
            
            Review 1: ```{review1}```
            Review 2: ```{review2}```
            Review 3: ```{review3}```
            Review 4: ```{review4}```
            Review 5: ```{review5}```
            Review 6: ```{review6}```
            """;

    @DisplayName("Testing Sentiment")
    @Test
    void testingSentiment() {
        PromptTemplate promptTemplate = new PromptTemplate(sentimentPrompt);

        System.out.println(chatModel.call(promptTemplate.create(Map.of("review1", review1,
                "review2", review2,
                "review3", review3,
                "review4", review4,
                "review5", review5,
                "review6", review6))).getResult().getOutput().getText());
    }

    String emotionPrompt = """
            Identify a list of emotions that the writer of the following reviews is expressing, and provide a brief summary of each review.
            
            Review 1: ```{review1}```
            Review 2: ```{review2}```
            Review 3: ```{review3}```
            Review 4: ```{review4}```
            Review 5: ```{review5}```
            Review 6: ```{review6}```
            """;

    @DisplayName("Testing Emotion")
    @Test
    void testingEmotion() {
        PromptTemplate promptTemplate = new PromptTemplate(emotionPrompt);

        System.out.println(chatModel.call(promptTemplate.create(Map.of("review1", review1,
                "review2", review2,
                "review3", review3,
                "review4", review4,
                "review5", review5,
                "review6", review6))).getResult().getOutput().getText());
    }

    String angerTestPrompt = """
            Check if writer of the following reviews is expressing anger. For each review, state the review number 
            and Give your answer as either yes or no.
            
            Respond using the following format:
            Review 1: yes
            Review 2: no
            Review N: ?
            
            Review 1: ```{review1}```
            Review 2: ```{review2}```
            Review 3: ```{review3}```
            Review 4: ```{review4}```
            Review 5: ```{review5}```
            Review 6: ```{review6}```
            """;

    @DisplayName("Testing for Anger")
    @Test
    void testingForAnger() {
        PromptTemplate promptTemplate = new PromptTemplate(angerTestPrompt);

        System.out.println(chatModel.call(promptTemplate.create(Map.of("review1", review1,
                "review2", review2,
                "review3", review3,
                "review4", review4,
                "review5", review5,
                "review6", review6))).getResult().getOutput().getText());
    }

    String story = """
            In a recent survey conducted by the government,\s
            public sector employees were asked to rate their level\s
            of satisfaction with the department they work at.\s
            The results revealed that NASA was the most popular\s
            department with a satisfaction rating of 95%.
                        
            One NASA employee, John Smith, commented on the findings,\s
            stating, "I'm not surprised that NASA came out on top.\s
            It's a great place to work with amazing people and\s
            incredible opportunities. I'm proud to be a part of\s
            such an innovative organization."
                        
            The results were also welcomed by NASA's management team,\s
            with Director Tom Johnson stating, "We are thrilled to\s
            hear that our employees are satisfied with their work at NASA.\s
            We have a talented and dedicated team who work tirelessly\s
            to achieve our goals, and it's fantastic to see that their\s
            hard work is paying off."
                        
            The survey also revealed that the\s
            Social Security Administration had the lowest satisfaction\s
            rating, with only 45% of employees indicating they were\s
            satisfied with their job. The government has pledged to\s
            address the concerns raised by employees in the survey and\s
            work towards improving job satisfaction across all departments.
            """;

    String prompt = """
            Determine five topics that are being discussed in the\s
            following text, which is delimited by triple backticks.
                        
            Make each item one or two words long.\s
                        
            Format your response as a list of items separated by commas.
                        
            Text sample: '''{story}'''
            """;

    @DisplayName("Inferring for Topics")
    @Test
    void inferTopics() {
        PromptTemplate promptTemplate = new PromptTemplate(prompt);

        System.out.println(chatModel.call(promptTemplate.create(Map.of("story", story))).getResult().getOutput().getText());
    }
}
