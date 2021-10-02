package com.fastcampus.jpa.bookmanager.repository;

import com.fastcampus.jpa.bookmanager.domain.Review;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("select distinct r from Review r join fetch r.comments")
    List<Review> findAllByFetchJoin();

    @Query("select r from Review r")
    List<Review> findAllByEntityGraph();

    @EntityGraph(attributePaths = "comments")
    List<Review> findAll();
}
