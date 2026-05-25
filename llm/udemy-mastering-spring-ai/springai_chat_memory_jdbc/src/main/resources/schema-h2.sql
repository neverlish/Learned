CREATE TABLE SPRING_AI_CHAT_MEMORY (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       conversation_id VARCHAR(36) NOT NULL,
                                       content CLOB NOT NULL,
                                       type VARCHAR(20) CHECK (type IN ('USER', 'ASSISTANT', 'SYSTEM', 'TOOL')) NOT NULL,
                                       timestamp TIMESTAMP NOT NULL
);

CREATE INDEX SPRING_AI_CHAT_MEMORY_CONVERSATION_ID_TIMESTAMP_IDX
    ON SPRING_AI_CHAT_MEMORY (conversation_id, timestamp);
