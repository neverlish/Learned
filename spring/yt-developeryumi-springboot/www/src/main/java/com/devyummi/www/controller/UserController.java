package com.devyummi.www.controller;

import com.devyummi.www.domain.user.dto.UserRequestDTO;
import com.devyummi.www.domain.user.dto.UserResponseDTO;
import com.devyummi.www.domain.user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원 가입 : 페이지 응답
    @GetMapping("/user/join")
    public String joinPage() {

        return "join";
    }

    // 회원 가입 : 수행
    @PostMapping("/user/join")
    public String joinProcess(UserRequestDTO dto) {

        userService.createOneUser(dto);

        return "redirect:/login";
    }

    // 회원 수정 : 페이지 응답
    @GetMapping("/user/update/{username}")
    public String updatePage(@PathVariable("username") String username, Model    model) {

        // 본인 또는 ADMIN 권한만 접근 가능
        if (userService.isAccess(username)) {
            UserResponseDTO dto = userService.readOneUser(username);
            model.addAttribute("USER", dto);
            return "update";
        }

        return "redirect:/login";
    }

    // 회원 수정 : 수행
    @PostMapping("/user/update/{username}")
    public String updateProcess(@PathVariable String username, UserRequestDTO dto) {

        // 본인 또는 ADMIN 권한만 접근 가능
        if (userService.isAccess(username)) {
            userService.updateOneUser(dto, username);
        }

        return "redirect:/user/update/" + username;
    }

}
