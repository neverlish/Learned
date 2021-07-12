package ex_generic_several_types

fun <T, R> T.map(mapper: (T) -> R): R {
    return mapper(this)
}

fun main(args: Array<String>) {
    val square: Int =
        11.map {
            it * it
        }

    println(square)
}