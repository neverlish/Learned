package com.devyummi.www.domain.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardResponseDTO {

    private Long id;
    private String title;
    private String content;
}
