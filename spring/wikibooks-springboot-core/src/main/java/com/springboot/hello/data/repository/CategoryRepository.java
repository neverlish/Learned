package com.springboot.hello.data.repository;

import com.springboot.hello.data.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
