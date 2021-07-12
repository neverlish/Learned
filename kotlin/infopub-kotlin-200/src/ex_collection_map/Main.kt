package ex_collection_map

fun main(args: Array<String>) {
    val origin = listOf(65, 66, 67, 68, 69)

    println(origin.map { it.toChar() })

    println(origin.mapIndexed { index, element ->
        println("[$index]: $element")
        element.toChar()
    })

    val to100 = 1..100
    println(to100.mapNotNull {
        if (it % 3 == 0) it
        else null
    })
}