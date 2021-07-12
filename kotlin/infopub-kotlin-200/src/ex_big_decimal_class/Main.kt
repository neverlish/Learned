package ex_big_decimal_class

fun main(args: Array<String>) {
    val a = 3.0000000000003.toBigDecimal()
    val b = 4.0000000000004.toBigDecimal()

    println(a * b)
}