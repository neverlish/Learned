package todoapp.web;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import todoapp.security.UserSession;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
public class UserController {
    @RequestMapping("/user/profile-picture")
    @RolesAllowed("ROLE_USER")
    public @ResponseBody byte[] profilePicture(UserSession userSession) throws IOException {
        Path profilePicturePath = Paths.get(userSession.getUser().getProfilePicture().getUri());
        return Files.readAllBytes(profilePicturePath);
    }
}
