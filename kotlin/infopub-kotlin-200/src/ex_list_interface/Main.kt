package ex_list_interface

fun main(args: Array<String>) {
    val list: List<Double> = listOf(20.18, 1.14, 9.15, 1.14)
    println(list[0])
    println(list.indexOf(1.14))
    println(list.indexOf(9.31))
    println(list.lastIndexOf(1.14))
    println(list.subList(0, 3))
}