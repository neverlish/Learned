package ex_collection_filter

fun main(args: Array<String>) {
    val to50 = 1..50
    println(to50.filter { it % 4 == 0 })
    println(to50.filterNot { it % 4 == 0 })
    println(to50.filterNotNull())
    println(to50.filterIndexed { index, element -> element > 20 })
    println(to50.filterIsInstance<Long>())
}