package hello.world.tutorial.websocketdemo.controller;

import hello.world.tutorial.websocketdemo.dto.ReqDto;
import hello.world.tutorial.websocketdemo.dto.ResDto;
import lombok.extern.slf4j.Slf4j;
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
}
