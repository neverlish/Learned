package ex_generic

fun <T> toFunction(value: T): () -> T = { value }

fun main(args: Array<String>) {
    val func: () -> Int = toFunction<Int>(1107)
    println(func())
}