package com.fastcampus.sr.kopring.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Column
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Entity
class SpringRunner(
    guideRunnerName: String,
    guideRunnerEmail: String,
    guideRunnerNickname: String
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(columnDefinition = "VARCHAR(50) COMMENT '가이드러너 이름'")
    var guideRunnerName: String = guideRunnerName

    @Column(columnDefinition = "VARCHAR(50) COMMENT '가이드러너 이메일'")
    var guideRunnerEmail: String = guideRunnerEmail

    @Column(columnDefinition = "VARCHAR(50) COMMENT '가이드러너 별명'")
    var guideRunnerNickname: String = guideRunnerEmail
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as SpringRunner

        if (id != other.id) return false
        if (guideRunnerName != other.guideRunnerName) return false
        if (guideRunnerEmail != other.guideRunnerEmail) return false
        if (guideRunnerNickname != other.guideRunnerNickname) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id?.hashCode() ?: 0
        result = 31 * result + guideRunnerName.hashCode()
        result = 31 * result + guideRunnerEmail.hashCode()
        result = 31 * result + guideRunnerNickname.hashCode()
        return result
    }

    override fun toString(): String {
        return "SpringRunner(id=$id, guideRunnerName='$guideRunnerName', guideRunnerEmail='$guideRunnerEmail', guideRunnerNickname='$guideRunnerNickname')"
    }

}

data class SpringRunnerDto(
    val guideRunnerName: String,
    val guideRunnerEmail: String,
    val guideRunnerNickname: String
) {
    companion object {
        fun of(source: SpringRunner): SpringRunnerDto {
            return SpringRunnerDto(source.guideRunnerName, source.guideRunnerEmail, source.guideRunnerNickname)
        }
    }
}

interface SpringRunnerRepository {

}

@Repository
interface SpringRunnerJpaRepository: SpringRunnerRepository, JpaRepository<SpringRunner, Long> {}

interface SpringRunnerFinder {
    fun findById(id: Long): SpringRunnerDto
}

interface SpringRunnerEditor {
    fun saveAll(entities: List<SpringRunner>)
}