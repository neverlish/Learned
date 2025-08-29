package todoapp.security.web.servlet;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import jakarta.annotation.security.RolesAllowed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import todoapp.commons.NotImplementedException;
import todoapp.security.AccessDeniedException;
import todoapp.security.UnauthorizedAccessException;
import todoapp.security.UserSession;
import todoapp.security.UserSessionRepository;
import todoapp.security.support.RolesAllowedSupport;

/**
 * Role(역할) 기반으로 사용자가 사용 권한을 확인하는 인터셉터 구현체이다.
 *
 * @author springrunner.kr@gmail.com
 */
public class RolesVerifyHandlerInterceptor implements HandlerInterceptor, RolesAllowedSupport {

  private final Logger log = LoggerFactory.getLogger(this.getClass());

  @Override
  public final boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
      if (handler instanceof HandlerMethod) {
          RolesAllowed rolesAllowed = ((HandlerMethod) handler).getMethodAnnotation(RolesAllowed.class);
          if (Objects.isNull(rolesAllowed)) {
              rolesAllowed = AnnotatedElementUtils.findMergedAnnotation(((HandlerMethod) handler).getBeanType(), RolesAllowed.class);
          }
          if (Objects.nonNull(rolesAllowed)) {
              log.debug("verify roles-allowed: {}", rolesAllowed);

              if (Objects.isNull(request.getUserPrincipal())) {
                  throw new UnauthorizedAccessException();
              }

              Set<String> matchedRoles = Stream.of(rolesAllowed.value())
                      .filter(role -> request.isUserInRole(role))
                      .collect(Collectors.toSet());

              log.debug("matched roles: {}", matchedRoles);

              if (matchedRoles.isEmpty()) {
                  throw new AccessDeniedException();
              }
          }
      }

      return true;
  }

}
