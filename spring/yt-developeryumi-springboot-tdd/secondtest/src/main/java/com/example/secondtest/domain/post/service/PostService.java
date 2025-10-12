package com.example.secondtest.domain.post.service;

import com.example.secondtest.domain.post.dto.PostRequestDTO;
import com.example.secondtest.domain.post.entity.PostEntity;
import com.example.secondtest.domain.post.repository.PostRepository;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Long create(PostRequestDTO dto) {
        if (dto.getTitle().isBlank()) {
            throw new IllegalArgumentException("빈값 금지");
        }
        PostEntity postEntity = new PostEntity();
        postEntity.setTitle(dto.getTitle());
        postEntity.setContent(dto.getContent());

        return postRepository.save(postEntity).getId();
    }
}
