fun main(args: Array<String>): Unit {
    val a = -36
    val result = absolute(a)
    println(result)
}

fun absolute(number: Int): Int {
    return if (number >= 0)
        number
    else -number
}