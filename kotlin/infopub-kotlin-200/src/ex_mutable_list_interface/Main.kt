package ex_mutable_list_interface

fun main(args: Array<String>) {
    val list: MutableList<Char> = mutableListOf('c', 'a', 'z')
    println(list)

    list.add(1, '%')
    println(list)

    list.addAll(0, listOf('L', 'P'))
    println(list)

    println(list.set(2, '/'))
    println(list)

    println(list.removeAt(4))
    println(list)
}