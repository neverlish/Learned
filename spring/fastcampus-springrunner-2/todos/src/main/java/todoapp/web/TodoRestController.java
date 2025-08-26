package todoapp.web;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import todoapp.core.todo.application.TodoFind;
import todoapp.core.todo.application.TodoRegistry;
import todoapp.core.todo.domain.Todo;

import java.util.List;

@RestController
//@Controller
public class TodoRestController {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final TodoFind finder;
    private final TodoRegistry editor;

    public TodoRestController(TodoFind finder, TodoRegistry editor) {
        this.finder = finder;
        this.editor = editor;
    }

//    @RequestMapping(path = "/api/todos", method = RequestMethod.GET)
//    @ResponseBody
    @GetMapping("/api/todos")
    public List<Todo> list() {
        return finder.all();
    }

//    @RequestMapping(path = "/api/todos", method = RequestMethod.POST)
    @PostMapping("/api/todos")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody @Valid CreateTodoCommand command) {
        logger.debug("request command : {}", command);

        editor.register(command.getTitle());
    }

    static class CreateTodoCommand {
        private String title;

        @NotBlank
        @Size(min = 4)
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        @Override
        public String toString() {
            return String.format("CreateTodoCommand [title=%s]", title);

        }
    }
}
