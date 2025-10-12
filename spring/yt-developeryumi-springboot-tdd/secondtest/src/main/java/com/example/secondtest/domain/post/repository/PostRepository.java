package com.example.secondtest.domain.post.repository;

import com.example.secondtest.domain.post.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
}

