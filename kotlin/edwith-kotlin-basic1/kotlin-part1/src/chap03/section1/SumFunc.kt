package chap03.section1

fun sum(a: Int = 2, b: Int = 5) = a + b

fun max(a: Int, b: Int) = if (a > b) a else b

fun outfunc(name: String) = println("name: $name")

fun main() { // 최상위 함수

    val result1 = sum(2, 3)
    val result3 = sum(b = 2)

    val a = 3
    val b = 5

    val result2 = max(a, b)

    outfunc("Kildong")
    println(result1)
    println(result2)
    println(result3)
}
