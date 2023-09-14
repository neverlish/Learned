package org.example.springbootdeveloper.config.error.exception;

import org.example.springbootdeveloper.config.error.ErrorCode;

public class ArticleNotFoundException extends NotFoundException {
    public ArticleNotFoundException() {
        super(ErrorCode.ARTICLE_NOT_FOUND);
    }
}
