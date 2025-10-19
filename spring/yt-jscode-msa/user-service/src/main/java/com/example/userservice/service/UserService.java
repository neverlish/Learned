package com.example.userservice.service;

import com.example.userservice.client.PointClient;
import com.example.userservice.domain.User;
import com.example.userservice.dto.SignUpRequestDto;
import com.example.userservice.domain.UserRepository;
import com.example.userservice.dto.UserResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PointClient pointClient;

    public UserService(UserRepository userRepository, PointClient pointClient) {
        this.userRepository = userRepository;
        this.pointClient = pointClient;
    }

    @Transactional
    public void signUp(SignUpRequestDto signUpRequestDto) {
        User user = new User(
            signUpRequestDto.getEmail(),
            signUpRequestDto.getName(),
            signUpRequestDto.getPassword()
        );

        User savedUser = this.userRepository.save(user);

        pointClient.addPoints(savedUser.getUserId(), 1000);
    }

    public UserResponseDto getUser(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return new UserResponseDto(
            user.getUserId(),
            user.getEmail(),
            user.getName()
        );
    }

    public List<UserResponseDto> getUsersByIds(List<Long> ids) {
        List<User> users = userRepository.findAllById(ids);

        return users.stream()
            .map(user -> new UserResponseDto(
                user.getUserId(),
                user.getEmail(),
                user.getName()
            ))
            .collect(Collectors.toList());
    }
}
