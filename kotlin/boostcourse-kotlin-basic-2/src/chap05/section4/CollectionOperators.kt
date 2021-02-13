package chap05.section4

fun main() {
    val list1 = listOf("one", "two", "three")
    val list2 = listOf(1, 2, 3)
    val map1 = mapOf("hi" to 1, "hello" to 2, "Goodbye" to 3)

    println(list1 + "four")
    println(list2 + 4)

    println(list2 - 1)
    println(list1 - "one")

    println(list1 + listOf("abc", "def"))

    println(map1 + Pair("Bye", 4))
    println(map1 - "hello")
    println(map1 + mapOf("Apple" to 4, "Orange" to 5))
    println(map1 - listOf("hi", "hello"))
}