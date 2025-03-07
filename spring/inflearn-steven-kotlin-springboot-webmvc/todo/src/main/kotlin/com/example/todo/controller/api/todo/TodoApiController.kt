package com.example.todo.controller.api.todo

import com.example.todo.model.http.TodoDto
import com.example.todo.service.TodoService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(description = "일정관리")
@RestController
@RequestMapping("/api/todo")
class TodoApiController(
    val todoService: TodoService
) {
    @ApiOperation(value = "일정확인", notes = "일정 확인 GET API")
    @GetMapping(path = [""])
    fun read(
        @ApiParam(name = "index")
        @RequestParam(required = false) index: Int?): ResponseEntity<Any?> {
        return index?.let {
            todoService.read(it)
        }?. let {
            return ResponseEntity.ok(it)
        }
        ?: kotlin.run {
            return ResponseEntity
                .status(HttpStatus.MOVED_PERMANENTLY)
                .header(HttpHeaders.LOCATION, "/api/todo/all")
                .build()
        }
    }

    @GetMapping(path = ["/all"])
    fun readAll(): MutableList<TodoDto> {
        return todoService.readAll()
    }

    @PostMapping(path = [""])
    fun create(@Valid @RequestBody todoDto: TodoDto): TodoDto? {
        return todoService.create(todoDto)
    }

    @PutMapping(path = [""])
    fun update(@Valid @RequestBody todoDto: TodoDto): TodoDto? {
        return todoService.create(todoDto)
    }

    @DeleteMapping(path = ["/{index}"])
    fun delete(@PathVariable(name = "index") _index: Int): ResponseEntity<Any> {
        if (!todoService.delete(_index)) {
            return ResponseEntity.status(500).build()
        }
        return ResponseEntity.ok().build()
    }
}