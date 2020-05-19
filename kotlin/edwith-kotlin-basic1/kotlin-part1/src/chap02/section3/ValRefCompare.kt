package chap02.section3

fun main() {
    val a: Int = 128
    val b = a

    println(a === b)

    val c: Int? = a
    val d: Int? = a
    val e: Int? = c

    println(c == d)
    println(c === d)
    println(c === e)
}