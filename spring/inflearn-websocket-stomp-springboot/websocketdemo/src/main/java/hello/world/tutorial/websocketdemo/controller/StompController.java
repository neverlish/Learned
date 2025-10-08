package hello.world.tutorial.websocketdemo.controller;

import hello.world.tutorial.websocketdemo.dto.ReqDto;
import hello.world.tutorial.websocketdemo.dto.ResDto;
import hello.world.tutorial.websocketdemo.dto.ResSessionsDto;
import hello.world.tutorial.websocketdemo.listener.StompEventListener;
import jakarta.annotation.Nullable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.security.InvalidParameterException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@Controller
@Slf4j
public class StompController {
    private final StompEventListener eventListener;
    private final SimpMessagingTemplate messagingTemplate;
    private final ConcurrentHashMap<String, ScheduledFuture<?>> scheduledMap = new ConcurrentHashMap<>();
    private final TaskScheduler taskScheduler;

    public StompController(StompEventListener eventListener, SimpMessagingTemplate messagingTemplate, TaskScheduler taskScheduler) {
        this.eventListener = eventListener;
        this.messagingTemplate = messagingTemplate;
        this.taskScheduler = taskScheduler;
    }

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

    @MessageMapping("/sessions")
    @SendToUser("/queue/sessions")
    public ResSessionsDto sessions(ReqDto request, MessageHeaders headers) {
        log.info("request: {}", request);
        Set<String> sessions = eventListener.getSessions();
        String sourceSessionId = headers.get("simpSessionId").toString();
        return new ResSessionsDto(sessions.size(), sessions.stream().toList(), sourceSessionId, LocalDateTime.now());
    }

    @MessageMapping("/code1")
    public void code1(ReqDto request) {
        log.info("request: {}", request);
        ResDto resDto = new ResDto(request.getMessage().toUpperCase(), LocalDateTime.now());

        messagingTemplate.convertAndSend("/topic/hello", resDto);
    }

    @MessageMapping("/code2")
    public void code2(ReqDto request, MessageHeaders headers) {
        log.info("request: {}", request);
        String sourceSessionId = headers.get("simpSessionId").toString();
        Set<String> sessions = eventListener.getSessions();

        ResSessionsDto resSessionsDto = new ResSessionsDto(sessions.size(), sessions.stream().toList(), sourceSessionId, LocalDateTime.now());

        messagingTemplate.convertAndSendToUser(sourceSessionId, "/queue/sessions", resSessionsDto, createHeaders(sourceSessionId));
    }

    private MessageHeaders createHeaders(@Nullable String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);

        if (sessionId != null) {
            headerAccessor.setSessionId(sessionId);
        }
        headerAccessor.setLeaveMutable(true);
        return headerAccessor.getMessageHeaders();
    }

    @MessageMapping("/start")
    public void start(ReqDto request, MessageHeaders headers) {
        log.info("request: {}", request);
        String sourceSessionId = headers.get("simpSessionId").toString();

        ScheduledFuture<?> scheduledFuture = taskScheduler.scheduleAtFixedRate(() -> {
            Random random = new Random();
            int currentPrice = random.nextInt(100);
            messagingTemplate.convertAndSendToUser(sourceSessionId, "/queue/trade", currentPrice, createHeaders(sourceSessionId));
        }, Duration.ofSeconds(3));

        scheduledMap.put(sourceSessionId, scheduledFuture);
    }

    @MessageMapping("/stop")
    public void stop(ReqDto request, MessageHeaders headers) {
        log.info("request: {}", request);
        String sourceSessionId = headers.get("simpSessionId").toString();

        ScheduledFuture<?> scheduledFuture = scheduledMap.remove(sourceSessionId);
        scheduledFuture.cancel(true);
    }

    @MessageMapping("/exception")
    @SendTo("/topic/hello")
    public void exception(ReqDto request, MessageHeaders headers) throws Exception {
        log.info("request: {}", request);
        String message = request.getMessage();
        switch(message) {
            case "runtime":
                throw new RuntimeException();
            case "nullPointer":
                throw new NullPointerException();
            case "io":
                throw new IOException();
            case "exception":
                throw new Exception();
            default:
                throw new InvalidParameterException();
        }
    }

}
