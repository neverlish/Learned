package com.devyummi.www.domain.user.entity;

import lombok.Getter;

@Getter
public enum UserRoleType {

    ADMIN("어드민"),
    USER("유저");

    private final String description;

    UserRoleType(String description) {
        this.description = description;
    }
}
