package todoapp.web;

import org.hamcrest.core.StringEndsWith;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import todoapp.TodosApplication;
import todoapp.core.user.domain.User;
import todoapp.security.UserSession;
import todoapp.security.UserSessionRepository;
import todoapp.web.model.SiteProperties;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LoginControllerTests {
    @Autowired ApplicationContext applicationContext;
    @Autowired UserSessionRepository userSessionRepository;
    @Autowired LoginController controller;

    WebClient webClient;
    WebTestClient webTestClient;

    @BeforeEach
    void setUp(@LocalServerPort int port) {
        webClient = WebClient.create("http://localhost:" + port);
        webTestClient = WebTestClient.bindToServer().baseUrl("http://localhost:" + port).build();
    }

    @Test
    void 스프링컨테이너는_자동클래스탐지로_로그인컨트롤러를_찾아_등록해요() {
        Assertions.assertTrue(applicationContext.containsBean("loginController"));
    }

    @Test
    void 인증되지않은_사용자가_로그인화면에_접근하면_로그인화면을_보여준다(@Autowired SiteProperties siteProperties) throws Exception {
        webTestClient.get().uri("/login").exchange().expectAll(
            spec -> spec.expectStatus().isOk(),
            spec -> spec.expectBody()
                    .xpath("//input[@name='username']").exists()
                    .xpath("//input[@name='password']").exists()
                    .xpath("//a[text()='" + siteProperties.getAuthor() + "']").exists()
        );
    }

    @Test
    void 인증된_사용자가_로그인화면에_접근하면_할일관리화면으로_전환시킨다() throws Exception {
        MultiValueMap<String, String> cookieStore = new LinkedMultiValueMap<>();

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>(); {
            formData.add("username", "user");
            formData.add("password", "password");
        }

        BodyInserters.FormInserter<String> formBody = BodyInserters.fromFormData(formData);

        webClient.post().uri("/login").body(formBody).exchangeToMono(response -> {
            response.cookies().forEach((name, cookies) -> {
                cookies.forEach(cookie -> cookieStore.add(name, cookie.getValue()));
            });
            return Mono.empty();
        }).block();

        webTestClient.get().uri("/login").cookies(cookies -> cookies.addAll(cookieStore)).exchange().expectAll(
                spec -> spec.expectStatus().is3xxRedirection(),
                spec -> spec.expectHeader().value(HttpHeaders.LOCATION, StringEndsWith.endsWith("/todos"))
        );
    }
}
