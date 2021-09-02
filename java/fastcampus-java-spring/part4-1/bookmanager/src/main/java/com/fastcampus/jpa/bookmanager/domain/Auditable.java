package com.fastcampus.jpa.bookmanager.domain;

import java.time.LocalDateTime;

public interface Auditable {
    LocalDateTime getCreatedAt();

    LocalDateTime getUpdatedAt();

    void setCreatedAt(LocalDateTime createdAt);
    void setUpdatedAt(LocalDateTime updatedAt);
}
