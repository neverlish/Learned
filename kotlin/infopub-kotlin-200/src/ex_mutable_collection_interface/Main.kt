package ex_mutable_collection_interface

fun main(args: Array<String>) {
    val mutableList: MutableCollection<Int> = mutableListOf(1, 2, 4, 2, 3, 2, 5)
    println(mutableList)

    mutableList.add(1)
    println(mutableList)

    mutableList.addAll(listOf(3, 2, 4))
    println(mutableList)

    mutableList.remove(1)
    println(mutableList)

    mutableList.removeAll(listOf(1, 2))
    println(mutableList)

    mutableList.retainAll(listOf(3, 5))
    println(mutableList)

    mutableList.clear()
    println(mutableList)
}