package hello.world.tutorial.websocketdemo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class ResDto {
    private String message;
    private LocalDateTime localDateTime;
}
