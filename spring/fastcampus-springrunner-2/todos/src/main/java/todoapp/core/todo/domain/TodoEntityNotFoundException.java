package todoapp.core.todo.domain;

import org.springframework.context.MessageSourceResolvable;

/**
 * 할일 저장소에서 할일 엔티티를 찾을 수 없을 때 발생 가능한 예외 클래스이다.
 *
 * @author springrunner.kr@gmail.com
 */
public class TodoEntityNotFoundException extends TodoEntityException implements MessageSourceResolvable {

  private final Long id;

  public TodoEntityNotFoundException(Long id) {
    super("Todo 엔티티를 찾을 수 없습니다. (id: %d)", id);
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  @Override
  public String[] getCodes() {
    return new String[] { "Exception." + getClass().getSimpleName()};
  }

  @Override
  public Object[] getArguments() {
    return new Object[] { String.valueOf(id) };
  }
}
