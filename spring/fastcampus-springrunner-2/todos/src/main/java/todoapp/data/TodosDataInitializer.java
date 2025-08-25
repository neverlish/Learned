package todoapp.data;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import todoapp.core.todo.domain.Todo;
import todoapp.core.todo.domain.TodoRepository;

@Component
public class TodosDataInitializer implements InitializingBean {

    private final TodoRepository todoRepository;

    public TodosDataInitializer(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        todoRepository.save(Todo.create("Task One"));
    }
}
