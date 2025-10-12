package com.example.secondtest.api;

import com.example.secondtest.domain.post.dto.PostRequestDTO;
import com.example.secondtest.domain.post.entity.PostEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class PageController {

    @GetMapping("/page")
    public String getPage(Model model) {

        List<PostEntity> postEntityList = new ArrayList<>();
        model.addAttribute("POSTLIST", postEntityList);

        return "page";
    }

    @PostMapping("/page")
    public String postPage(PostRequestDTO dto) {

        return "redirect:/page";
    }

}
