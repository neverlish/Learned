package com.devyummi.www.domain.user.service;

import com.devyummi.www.domain.user.dto.UserRequestDTO;
import com.devyummi.www.domain.user.dto.UserResponseDTO;
import com.devyummi.www.domain.user.entity.UserEntity;
import com.devyummi.www.domain.user.entity.UserRoleType;
import com.devyummi.www.domain.user.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    // 유저 한 명 생성
    @Transactional
    public void createOneUser(UserRequestDTO dto) {

        String username = dto.getUsername();
        String password = dto.getPassword();
        String nickname = dto.getNickname();

        // 동일한 username이 있는지 확인
        if (userRepository.existsByUsername(username)) {
            return;
        }

        // 유저에 대한 Entity 생성 : DTO -> Entity 및 추가 정보 set
        UserEntity entity = new UserEntity();
        entity.setUsername(username);
        entity.setPassword(bCryptPasswordEncoder.encode(password));
        entity.setNickname(nickname);
        entity.setRole(UserRoleType.USER);

        // Entity 저장
        userRepository.save(entity);
    }

    // 유저 한 명 읽기
    @Transactional(readOnly = true)
    public UserResponseDTO readOneUser(String username) {

        UserEntity entity = userRepository.findByUsername(username).orElseThrow();

        UserResponseDTO dto = new UserResponseDTO();
        dto.setUsername(entity.getUsername());
        dto.setNickname(entity.getNickname());
        dto.setRole(entity.getRole().toString());

        return dto;
    }

    // 유저 모두 읽기
    @Transactional(readOnly = true)
    public List<UserResponseDTO> readAllUsers() {

        List<UserEntity> list = userRepository.findAll();

        List<UserResponseDTO> dtos = new ArrayList<>();
        for (UserEntity user : list) {
            UserResponseDTO dto = new UserResponseDTO();
            dto.setUsername(user.getUsername());
            dto.setNickname(user.getNickname());
            dto.setRole(user.getRole().toString());

            dtos.add(dto);
        }

        return dtos;
    }

    // 유저 로그인 (로그인 같은 경우 읽기지만, 시큐리티 형식으로 맞춰야 합니다.)
    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity entity = userRepository.findByUsername(username).orElseThrow();

        return User.builder()
                .username(entity.getUsername())
                .password(entity.getPassword())
                .roles(entity.getRole().toString())
                .build();
    }

    // 유저 한 명 수정
    @Transactional
    public void updateOneUser(UserRequestDTO dto, String username) {

        // 기존 유저 정보 읽기
        UserEntity entity = userRepository.findByUsername(username).orElseThrow();

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            entity.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        }

        if (dto.getNickname() != null && !dto.getNickname().isEmpty()) {
            entity.setNickname(dto.getNickname());
        }

        userRepository.save(entity);
    }

    // 유저 한 명 삭제
    @Transactional
    public void deleteOneUser(String username) {

        userRepository.deleteByUsername(username);
    }
}
