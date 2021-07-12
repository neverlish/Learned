package ex_verify_real_number

fun main(args: Array<String>) {
    val a: Double = 0.0 / 0.0
    val b: Double = 7 / 0.0
    val c: Double = 3.2

    print("$a ")
    println(a.isNaN())

    print("$b ")
    println(b.isInfinite())

    print("$c ")
    println(c.isFinite())
}