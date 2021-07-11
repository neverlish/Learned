package ex_function_reference

fun plus(a: Int, b: Int) = println("plus 호출됨 ${a + b}")

object Object {
    fun minus(a: Int, b: Int) = println("Object의 minus 호출됨 ${a - b}")
}

class Class {
    fun average(a: Int, b: Int) = println("Class Average 호출됨 ${(a + b) / 2}")
}

fun main(args: Array<String>) {
    var instanceFunc: (Int, Int) -> Unit
    instanceFunc = ::plus
    instanceFunc(60, 27)

    instanceFunc = Object::minus
    instanceFunc(36, 12)

    instanceFunc = Class()::average
    instanceFunc(25, 15)
}