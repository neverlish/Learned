package chap03.section1

fun main() { // 최상위 함수

    fun sum(a: Int, b: Int): Int { // 지역 함수
        return a + b
    }

    val result1 = sum(2, 3)
    println(result1)
}
