package ex_real_number_to_binary

fun main(args: Array<String>) {
    val normal = 10.0
    val infinite = 10.0 / 0
    val nan = 0.0 / 0

    println(normal.toBits().toString(2))
    println(infinite.toBits().toString(2))
    println(nan.toBits().toString(2))

    println(normal.toRawBits().toString(2))
    println(infinite.toRawBits().toString(2))
    println(nan.toRawBits().toString(2))
}