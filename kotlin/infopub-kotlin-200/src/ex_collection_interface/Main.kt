package ex_collection_interface

fun main(args: Array<String>) {
    val list: Collection<Int> = listOf(18, 1, 1, 4)

    println(list.size)
    println(list.isEmpty())
    println(18 in list)

    for (i: Int in list)
        print("$i ")
}