package ex_inline_function

inline fun hello() {
    println("Hello")
    println("Kotlin")
}

fun main(args: Array<String>) {
    hello()
    hello()
    hello()
}