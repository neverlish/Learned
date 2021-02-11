package chap03.section2

// 실드 클래스 선언 방법 첫번째 스타일
sealed class Result {
    open class Success(val message: String): Result()
    class Error(val code: Int, val message: String): Result()
}

class Status: Result()
class Inside: Result.Success("Status")

// 실드 클래스 선언 방법 두번째 스타일
sealed class Result2

open class Success(val message: String): Result2()
class Error(val code: Int, val message: String): Result2()

class Status2: Result2()
class Inside2: Success("Status")

fun main() {
    val result = Result.Success("Good!")
    val msg = eval(result)
    println(msg)
}

fun eval(result: Result): String = when(result) {
    is Status -> "in progress"
    is Result.Success -> result.message
    is Result.Error -> result.message
}