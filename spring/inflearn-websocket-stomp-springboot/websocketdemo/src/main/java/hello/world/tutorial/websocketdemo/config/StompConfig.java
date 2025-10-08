package hello.world.tutorial.websocketdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class StompConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/helloworld");                    // websocket
        registry.addEndpoint("/helloworld").withSockJS();       // sockjs
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");      // 위 목적 외 destination prefix
        config.setApplicationDestinationPrefixes("/app");                   // @MessageMapping 를 이용해서 메시지 수신할 destination prefix
    }

}