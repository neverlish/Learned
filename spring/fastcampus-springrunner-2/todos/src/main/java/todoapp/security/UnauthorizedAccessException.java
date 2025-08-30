package todoapp.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import todoapp.commons.SystemException;

/**
 * 인증되지 않은 사용자 접근시 발생 가능한 예외 클래스이다.
 *
 * @author springrunner.kr@gmail.com
 */
@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class UnauthorizedAccessException extends SystemException {

  private static final long serialVersionUID = 1L;

  public UnauthorizedAccessException() {
    super("인증되지 않은 접근입니다.");
  }

}
