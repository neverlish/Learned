package ex_throw_exception

fun main(args: Array<String>) {
    try {
        something()
    } catch (e: Exception) {
        println(e.message)
    }
}

fun something() {
    val num1 = 10
    val num2 = 0
    div(num1, num2)
}

fun div(a: Int, b: Int): Int {
    if (b == 0)
        throw Exception("0으로 나눌 수 없습니다.")
    return a / b
}