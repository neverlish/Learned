package dev.springrunner;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.JstlView;

import java.util.Date;

@Controller
public class HelloController {

    @RequestMapping("/hello")
    public ModelAndView hello(@RequestParam("name") String name) {
        // Model 생성
        HelloModel model = new HelloModel(name);

        // View 생성
        View view = new JstlView("/WEB-INF/templates/HelloView.jsp");

        // ModelAndView 생성 및 초기화
        ModelAndView mav = new ModelAndView();
        mav.addObject("hello", model);
        mav.setView(view);

        return mav;
    }
}