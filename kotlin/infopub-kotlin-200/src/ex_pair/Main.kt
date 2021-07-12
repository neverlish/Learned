package ex_pair

fun divide(a: Int, b: Int): Pair<Int, Int> = Pair(a / b, a % b)

fun main(args: Array<String>) {
    val (q, r) = divide(10,3)
    println("몫: $q")
    println("나머지: $r")
}