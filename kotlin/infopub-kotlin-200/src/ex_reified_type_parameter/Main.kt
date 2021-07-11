package ex_reified_type_parameter

inline fun <reified T> check() {
    val number = 0

    if (number is T)
        println("T는 Int 타입입니다")
}

fun main(args: Array<String>) {
    check<Int>()
}