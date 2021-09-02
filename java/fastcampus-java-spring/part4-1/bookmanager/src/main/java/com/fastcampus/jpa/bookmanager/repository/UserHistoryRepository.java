package com.fastcampus.jpa.bookmanager.repository;

import com.fastcampus.jpa.bookmanager.domain.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHistoryRepository extends JpaRepository<UserHistory, Long> {
}
