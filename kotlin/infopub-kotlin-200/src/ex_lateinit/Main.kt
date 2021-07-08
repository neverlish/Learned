package ex_lateinit

class Point(val x: Int, val y: Int)

class Rect {
    lateinit var pt: Point
    lateinit var pt2: Point

    val width: Int get() = pt2.x - pt.x
    val height: Int get() = pt2.y - pt.y
    val area get() = width * height
}

fun main(args: Array<String>) {
    val rect = Rect()
    rect.pt = Point(3,3)
    rect.pt2 = Point(6, 5)
    println("너비: ${rect.width}")
    println("높이: ${rect.height}")
    println("넓이: ${rect.area}")
}