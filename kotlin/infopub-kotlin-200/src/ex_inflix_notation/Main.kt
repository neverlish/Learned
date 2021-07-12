package ex_inflix_notation

class Point(var x: Int = 0, var y: Int = 0) {
    infix fun from(base: Point): Point {
       return Point(x - base.x, y - base.y)
    }
}

fun main(args: Array<String>) {
    val pt = Point(3,6) from Point(1,1)
    println(pt.x)
    println(pt.y)
}