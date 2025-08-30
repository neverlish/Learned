package todoapp.web;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import todoapp.core.user.application.ProfilePictureChanger;
import todoapp.core.user.domain.ProfilePicture;
import todoapp.core.user.domain.ProfilePictureStorage;
import todoapp.core.user.domain.User;
import todoapp.security.UserSession;
import todoapp.security.UserSessionRepository;
import todoapp.web.model.UserProfile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RolesAllowed("ROLE_USER")
public class UserRestController {

    private final ProfilePictureChanger profilePictureChanger;
    private final ProfilePictureStorage profilePictureStorage;
    private final UserSessionRepository userSessionRepository;

    public UserRestController(ProfilePictureChanger profilePictureChanger, ProfilePictureStorage profilePictureStorage, UserSessionRepository userSessionRepository) {
        this.profilePictureChanger = profilePictureChanger;
        this.profilePictureStorage = profilePictureStorage;
        this.userSessionRepository = userSessionRepository;
    }

    @GetMapping("/api/user/profile")
    public UserProfile userProfile(UserSession userSession) {
        return new UserProfile(userSession.getUser());
    }

    @PostMapping("/api/user/profile-picture")
    public UserProfile changeProfilePicture(MultipartFile profilePicture, UserSession userSession) throws IOException {
        URI profilePictureUri = profilePictureStorage.save(profilePicture.getResource());

        User updatedUser = profilePictureChanger.change(userSession.getName(), new ProfilePicture(profilePictureUri));
        userSessionRepository.set(new UserSession(updatedUser));

        return new UserProfile(updatedUser);
    }
}
