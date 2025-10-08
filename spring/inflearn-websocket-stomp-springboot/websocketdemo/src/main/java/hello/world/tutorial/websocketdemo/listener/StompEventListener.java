package hello.world.tutorial.websocketdemo.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.*;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class StompEventListener {

    private final ConcurrentHashMap<String, String> sessionMap = new ConcurrentHashMap<>();

    public Set<String> getSessions() {
        return sessionMap.keySet();
    }

    @EventListener
    public void listener(SessionConnectEvent sessionConnectEvent) {
        log.info("sessionConnectEvent. {}", sessionConnectEvent);

    }

    @EventListener
    public void listener(SessionConnectedEvent sessionConnectedEvent) {
        log.info("sessionConnectedEvent. {}", sessionConnectedEvent);
        String sessionId = sessionConnectedEvent.getMessage().getHeaders().get("simpSessionId").toString();
        sessionMap.put(sessionId, sessionId);
    }

    @EventListener
    public void listener(SessionSubscribeEvent sessionSubscribeEvent) {
        log.info("sessionSubscribeEvent. {}", sessionSubscribeEvent);
    }

    @EventListener
    public void listener(SessionUnsubscribeEvent sessionUnsubscribeEvent) {
        log.info("sessionUnsubscribeEvent. {}", sessionUnsubscribeEvent);
    }

    @EventListener
    public void listener(SessionDisconnectEvent sessionDisconnectEvent) {
        log.info("sessionDisconnectEvent. {}", sessionDisconnectEvent);
        String sessionId = sessionDisconnectEvent.getMessage().getHeaders().get("simpSessionId").toString();
        sessionMap.remove(sessionId);
    }
}
