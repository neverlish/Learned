package ex_comparable_interface

class Rectangle(val width: Int, val height: Int): Comparable<Rectangle> {
    val area = width *  height

    override fun compareTo(other: Rectangle): Int =
        when {
            this.area > other.area -> 1
            this.area < other.area -> -1
            else -> 0
        }
}

fun main(args: Array<String>) {
    val rect = Rectangle(3, 5)
    val rect2 = Rectangle(7, 3)
    val rect3 = Rectangle(2, 9)

    println(rect >= rect3)
    println(rect < rect2)
    println(rect2 > rect3)
}