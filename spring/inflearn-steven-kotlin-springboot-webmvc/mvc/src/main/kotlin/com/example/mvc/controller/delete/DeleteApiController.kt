package com.example.mvc.controller.delete

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class DeleteApiController {

    @DeleteMapping(path=["/delete-mapping"])
    fun deleteMapping(
        @RequestParam(value="name") _name: String,
        @RequestParam(name="age") _age: Int
    ): String {
        println(_name)
        println(_age)
        return _name + " " + _age
    }

    @DeleteMapping(path=["/delete-mapping/name/{name}/age/{age}"])
    fun deleteMappingPath(@PathVariable(value="name") _name: String, @PathVariable(name="age") _age: Int): String {
        println(_name)
        println(_age)
        return _name + " " + _age
    }
}