package hello.world.tutorial.websocketdemo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Data
public class ResSessionsDto {
    private int count;
    private List<String> sessions;

    private String sourceSessionId;
    private LocalDateTime localDateTime;
}
