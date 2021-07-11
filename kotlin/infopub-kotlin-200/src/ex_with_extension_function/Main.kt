package ex_with_extension_function

fun main(args: Array<String>) {
    val a = 3; val b = 7

    with (a * b - b * b) {
        println(this)
        println(-this)
    }
}