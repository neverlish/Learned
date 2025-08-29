package todoapp.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import todoapp.core.user.application.UserPasswordVerifier;
import todoapp.core.user.application.UserRegistration;
import todoapp.core.user.domain.User;
import todoapp.core.user.domain.UserEntityNotFoundException;
import todoapp.core.user.domain.UserPasswordNotMatchedException;
import todoapp.security.UserSession;
import todoapp.security.UserSessionRepository;

import java.util.Objects;

@Controller
public class LoginController {
    private final UserPasswordVerifier userPasswordVerifier;
    private final UserRegistration userRegistration;
    private final UserSessionRepository userSessionRepository;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    public LoginController(
            UserPasswordVerifier userPasswordVerifier,
            UserRegistration userRegistration,
            UserSessionRepository userSessionRepository) {
        this.userPasswordVerifier = userPasswordVerifier;
        this.userRegistration = userRegistration;
        this.userSessionRepository = userSessionRepository;
    }

    @GetMapping("login")
    public String loginForm() {
        if (Objects.nonNull(userSessionRepository.get())) {
            return "redirect:/todos";
        }
        return "login";
    }

    @PostMapping("login")
    public String loginProcess(
//        @RequestParam("username") String username,
//        @RequestParam String username,
//        String username,
//        String password
        @Valid LoginCommand command,
        BindingResult bindingResult,
        Model model
    ) {
        logger.debug("login command: {}", command);

        if (bindingResult.hasErrors()) {
            model.addAttribute("bindingResult", bindingResult);
            model.addAttribute("message", "입력 값이 없거나 올바르지 않아요");
            return "login";
        }

        User user;

        try {
            user = userPasswordVerifier.verify(command.getUsername(), command.getPassword());
        } catch (UserEntityNotFoundException error) {
            user = userRegistration.join(command.getUsername(), command.password);
        }
//        catch (UserPasswordNotMatchedException error) {
//            model.addAttribute("message", error.getMessage());
//            return "login";
//        }
        userSessionRepository.set(new UserSession(user));

        return "redirect:/todos";
    }

    @ExceptionHandler(BindException.class)
    public String handleBindException(BindException error, Model model) {
        model.addAttribute("bindingResult", error.getBindingResult());
        model.addAttribute("message", "입력 값이 없거나 올바르지 않아요");
        return "login";
    }

    @ExceptionHandler(UserPasswordNotMatchedException.class)
    public String handleUserPasswordNotMatchedException(UserPasswordNotMatchedException error, Model model) {
        model.addAttribute("message", error.getMessage());
        return "login";
    }

    static class LoginCommand {
        @Size(min = 4, max = 20)
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
