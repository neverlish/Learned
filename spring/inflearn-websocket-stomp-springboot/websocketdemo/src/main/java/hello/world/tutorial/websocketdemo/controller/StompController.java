package hello.world.tutorial.websocketdemo.controller;

import hello.world.tutorial.websocketdemo.dto.ReqDto;
import hello.world.tutorial.websocketdemo.dto.ResDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

@Controller
@Slf4j
public class StompController {
//    @GetMapping("/aaa")
    @MessageMapping("/hello")
    @SendTo("/topic/hello")
    public ResDto basic(ReqDto reqDto) {
        log.info("reqDto: {}", reqDto);

        return new ResDto(reqDto.getMessage().toUpperCase(), LocalDateTime.now());
    }

    @MessageMapping("/multi")
    @SendTo({"/topic/hello", "/topic/hello2"})
    public ResDto multi(ReqDto request) {
        log.info("request: {}", request);

        return new ResDto(request.getMessage().toUpperCase(), LocalDateTime.now());
    }

    @MessageMapping("/hello1")
    @SendTo("/topic/hello")
    public ResDto annotations(Message<ReqDto> message, MessageHeaders headers, ReqDto request) {
        log.info("message: {}", message);
        log.info("headers: {}", headers);
        log.info("request: {}", request);

        return new ResDto(request.getMessage().toUpperCase(), LocalDateTime.now());
    }

    @MessageMapping("/hello/{detail}")
    @SendTo("/topic/hello")
    public ResDto detail(@DestinationVariable("detail") String detail, ReqDto request) {
        log.info("detail: {}", detail);
        log.info("request: {}", request);

        return new ResDto("[" + detail + "]_" + request.getMessage().toUpperCase(), LocalDateTime.now());
    }

}
