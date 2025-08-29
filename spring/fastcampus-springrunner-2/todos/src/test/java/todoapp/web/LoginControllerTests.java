package todoapp.web;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.context.web.WebAppConfiguration;
import todoapp.TodosApplication;
import todoapp.core.user.domain.User;
import todoapp.security.UserSession;
import todoapp.security.UserSessionRepository;

//@ExtendWith(SpringExtension.class)
//@ContextConfiguration(classes = TodosApplication.class)
//@WebAppConfiguration
//@SpringJUnitConfig(TodosApplication.class)
@SpringJUnitWebConfig(TodosApplication.class)
public class LoginControllerTests {
    @Autowired ApplicationContext applicationContext;
    @Autowired UserSessionRepository userSessionRepository;
    @Autowired LoginController controller;

    @Test
    void 스프링컨테이너는_자동클래스탐지로_로그인컨트롤러를_찾아_등록해요() {
        Assertions.assertTrue(applicationContext.containsBean("loginController"));
    }

    @Test
    void 인증되지않은_사용자가_로그인화면에_접근하면_로그인화면을_보여준다() {
        Assertions.assertEquals("login", controller.loginForm());
    }

    @Test
    void 인증된_사용자가_로그인화면에_접근하면_할일관리화면으로_전환시킨다() {
        userSessionRepository.set(new UserSession(new User("tester", "")));

        Assertions.assertEquals("redirect:/todos", controller.loginForm());
    }
}
