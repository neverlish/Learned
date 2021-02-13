package chap05.section4

fun main() {
    val list = listOf(1, 2, 3, 4, 5, 6)
    val listPair = listOf(Pair("A", 300), Pair("B", 200), Pair("C", 100), Pair("D", 200))
    val listRepeated = listOf(2, 2, 3, 4, 5, 5, 6)

    println("elementAt: " + list.elementAt(1))

    println("elementAtOrElse: " + list.elementAtOrElse(10, { 2 * it }))

    println("elementAtOrNull: " + list.elementAtOrNull(10))
}