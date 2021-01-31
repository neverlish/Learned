package chap02.section1

open class First {
    open val x: Int = 0
        get() {
            println("First x")
            return field
        }

    val y: Int = 0
}

class Second : First() {
    override var x: Int = 0
        get() {
            println("Second x")
            return field + 3
        }
        set(value) {
            field = value + 10
        }
}

fun main() {
    val second = Second()
    println(second.x)
    second.x = 10
    println(second.x)
    println(second.y)
}