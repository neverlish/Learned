package ex_java_to_kotlin_types

fun main(args: Array<String>) {
    val rand: Double = Math.random()
    println(rand)

    val buffer: StringBuffer = StringBuffer()
    buffer.append("hello, ")
    buffer.append("world!")

    val result: String = buffer.toString()
    println(result)
}