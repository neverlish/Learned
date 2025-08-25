package todoapp.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Controller
public class TodoController {
    @RequestMapping("/todos")
    public ModelAndView todos() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("todos");

        ViewResolver viewResolver = new InternalResourceViewResolver();
        View view = viewResolver.resolveViewName( "todos", null);

        return mav;
    }
}
