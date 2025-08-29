package todoapp.web;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import todoapp.TodosApplication;
import todoapp.core.user.domain.User;
import todoapp.security.UserSession;
import todoapp.security.UserSessionRepository;

import java.util.Objects;

public class LoginControllerTests {
    private AnnotationConfigServletWebServerApplicationContext applicationContext;

    @BeforeEach
    void setUp() throws Exception {
        applicationContext = new AnnotationConfigServletWebServerApplicationContext(TodosApplication.class);
    }

    @AfterEach
    void tearDown() throws Exception {
        if (Objects.nonNull(applicationContext)) {
            applicationContext.close();
        }
    }
    @Test
    void 스프링컨테이너는_자동클래스탐지로_로그인컨트롤러를_찾아_등록해요() {
        Assertions.assertTrue(applicationContext.containsBean("loginController"));
    }

    @Test
    void 인증되지않은_사용자가_로그인화면에_접근하면_로그인화면을_보여준다() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();

        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request, response));

        LoginController controller = applicationContext.getBean(LoginController.class);
        Assertions.assertEquals("login", controller.loginForm());

        RequestContextHolder.resetRequestAttributes();
    }

    @Test
    void 인증된_사용자가_로그인화면에_접근하면_할일관리화면으로_전환시킨다() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();

        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request, response));

        UserSessionRepository userSessionRepository = applicationContext.getBean(UserSessionRepository.class);
        userSessionRepository.set(new UserSession(new User("tester", "")));

        LoginController controller = applicationContext.getBean(LoginController.class);
        Assertions.assertEquals("redirect:/todos", controller.loginForm());

        RequestContextHolder.resetRequestAttributes();
    }
}
