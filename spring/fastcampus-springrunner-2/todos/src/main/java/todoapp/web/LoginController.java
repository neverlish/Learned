package todoapp.web;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping("login")
    public void loginForm() {

    }

    @PostMapping("login")
    public void loginProcess(
//        @RequestParam("username") String username,
//        @RequestParam String username,
//        String username,
//        String password
        LoginCommand command
    ) {

        logger.debug("login command: {}", command);
    }

    static class LoginCommand {
        String username;
        String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        @Override
        public String toString() {
            return String.format("LoginCommand [username=%s, password=%s]", username, password);
        }
    }
}
