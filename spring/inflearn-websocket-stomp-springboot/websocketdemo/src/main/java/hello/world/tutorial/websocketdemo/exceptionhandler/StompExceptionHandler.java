package hello.world.tutorial.websocketdemo.exceptionhandler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.io.IOException;

@ControllerAdvice
@Slf4j
public class StompExceptionHandler {

    private final SimpMessagingTemplate messagingTemplate;

    public StompExceptionHandler(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageExceptionHandler
    public void handleException(Exception exception) {
        log.error("exception: {}", exception.getClass());

    }

    @MessageExceptionHandler
    public void handleException(RuntimeException exception) {
        log.error("exception: {}", exception.getClass());

    }

    @MessageExceptionHandler
    @SendTo("/topic/hello")
    public String handleException(IOException exception, MessageHeaders headers) {
        log.error("exception: {}", exception.getClass());
        return "error!!";
    }


}
