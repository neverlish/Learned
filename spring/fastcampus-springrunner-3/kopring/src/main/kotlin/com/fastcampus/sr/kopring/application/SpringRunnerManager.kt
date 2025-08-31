package com.fastcampus.sr.kopring.application

import com.fastcampus.sr.kopring.domain.SpringRunner
import com.fastcampus.sr.kopring.domain.SpringRunnerDto
import com.fastcampus.sr.kopring.domain.SpringRunnerEditor
import com.fastcampus.sr.kopring.domain.SpringRunnerFinder
import com.fastcampus.sr.kopring.domain.SpringRunnerJpaRepository
import com.fastcampus.sr.kopring.domain.SpringRunnerRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class SpringRunnerManager(private val repository: SpringRunnerJpaRepository): SpringRunnerFinder {
    @Transactional(readOnly = true)
    override fun findById(id: Long): SpringRunnerDto {
        val target = repository.findById(id).orElseThrow { IllegalArgumentException("Not found: $id") }
        return SpringRunnerDto.of(target)
    }
}