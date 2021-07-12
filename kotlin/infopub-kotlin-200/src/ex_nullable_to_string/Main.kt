package ex_nullable_to_string

fun main(args: Array<String>) {
    val empty: Int? = null
    val str: String = empty.toString()
    println(str)
}