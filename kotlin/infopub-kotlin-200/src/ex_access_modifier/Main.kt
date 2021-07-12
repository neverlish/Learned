package ex_access_modifier

class Rectangle(private val width: Int, private val height: Int) {
    val area: Int
        get() = width * height
}

fun main(args: Array<String>) {
    val rect = Rectangle(5, 7)
//    println(rect.width)
    println(rect.area)
}