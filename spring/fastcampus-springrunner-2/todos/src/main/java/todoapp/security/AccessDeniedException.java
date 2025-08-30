package todoapp.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import todoapp.commons.SystemException;

/**
 * 권한이 없어 접근 불가 상황시 발생 가능한 예외 클래스이다.
 *
 * @author springrunner.kr@gmail.com
 */
@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class AccessDeniedException extends SystemException {

  public AccessDeniedException() {
    super("서비스 접근을 거부합니다.");
  }

}
