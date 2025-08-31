package com.fastcampus.sr.kopring.infrastructure

import com.fastcampus.sr.kopring.application.SpringRunnerManager
import com.fastcampus.sr.kopring.domain.SpringRunnerDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.PathVariable

@RestController
class SpringRunnerRestController(private val manager: SpringRunnerManager) {
    @GetMapping("/api/v1/spring-runners/{id}")
    fun findById(@PathVariable id: Long): SpringRunnerDto? {
        return manager.findById(id)
    }
}