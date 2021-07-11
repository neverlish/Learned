package ex_iterator

fun main(args: Array<String>) {
    val range: IntRange = 1..3
    val iter: Iterator<Int> = range.iterator()

    println(iter.hasNext())
    println(iter.next())

    println(iter.hasNext())
    println(iter.next())

    println(iter.hasNext())
    println(iter.next())

    println(iter.hasNext())
}