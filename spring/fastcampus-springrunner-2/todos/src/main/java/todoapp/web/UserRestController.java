package todoapp.web;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import todoapp.core.user.domain.User;
import todoapp.web.model.UserProfile;

import java.util.Objects;

@RestController
public class UserRestController {
    @GetMapping("/api/user/profile")
    public ResponseEntity<UserProfile> userProfile(
//        HttpSession session
        @SessionAttribute("user") User user
    ) {
//        User user = (User) session.getAttribute("user");
        if (Objects.nonNull(user)) {
            return ResponseEntity.ok(new UserProfile(user));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
