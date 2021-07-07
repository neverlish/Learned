package ex_elvis_operator

fun main(args: Array<String>) {
    val number: Int? = null
    println(number ?: 0)

    var number2: Int? = 15
    println(number2 ?: 0)
}