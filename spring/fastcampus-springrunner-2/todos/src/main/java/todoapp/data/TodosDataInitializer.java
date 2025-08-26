package todoapp.data;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import todoapp.core.todo.domain.Todo;
import todoapp.core.todo.domain.TodoRepository;

@Component
@ConditionalOnProperty(name = "todos.data.initialize", havingValue = "true")
public class TodosDataInitializer implements InitializingBean, ApplicationRunner, CommandLineRunner {

    private final TodoRepository todoRepository;

    public TodosDataInitializer(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        todoRepository.save(Todo.create("Task One"));
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        todoRepository.save(Todo.create("Task two"));
    }

    @Override
    public void run(String... args) throws Exception {
        todoRepository.save(Todo.create("Task three"));
    }
}
