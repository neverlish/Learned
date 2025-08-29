package todoapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import todoapp.security.AccessDeniedException;
import todoapp.security.UnauthorizedAccessException;
import todoapp.web.model.SiteProperties;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalControllerAdvice {
    private final SiteProperties siteProperties;

    public GlobalControllerAdvice(SiteProperties siteProperties) {
        this.siteProperties = siteProperties;
    }

    @ModelAttribute("site")
    public SiteProperties siteProperties() {
        return siteProperties;
    }

//    @ExceptionHandler(UnauthorizedAccessException.class)
//    public ResponseEntity<Map<String, Object>> handleUnauthorizedAccessException(UnauthorizedAccessException error) {
//        Map<String, Object> attributes = new HashMap<>();
//        attributes.put("error", error.getClass().getSimpleName());
//        attributes.put("message", error.getMessage());
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(attributes);
//    }
//
//    @ExceptionHandler(AccessDeniedException.class)
//    public ResponseEntity<Map<String, Object>> handleAccessDeniedException(AccessDeniedException error) {
//        Map<String, Object> attributes = new HashMap<>();
//        attributes.put("error", error.getClass().getSimpleName());
//        attributes.put("message", error.getMessage());
//        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(attributes);
//    }
}
