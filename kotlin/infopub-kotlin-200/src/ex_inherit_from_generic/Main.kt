package ex_inherit_from_generic

fun main(args: Array<String>) {
    val rect = Rectangle(10, 5)
    val rect2 = Rectangle(3, 8)

    println(rect + rect2)
}