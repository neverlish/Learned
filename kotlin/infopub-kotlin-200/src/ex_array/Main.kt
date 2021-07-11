package ex_array

fun main(args: Array<String>) {
    val integers: Array<Int> = arrayOf(10, 20, 30, 40)

    println(integers.size)
    println(integers[1])

    for (i in integers)
        println("$i ")
}