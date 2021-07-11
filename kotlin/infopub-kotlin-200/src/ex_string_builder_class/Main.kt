package ex_string_builder_class

fun main(args: Array<String>) {
    val builder = StringBuilder()
        .append("2018 ")
        .append("Pyeongchang ")
        .append("Olympic")

    val result = builder.toString()
    println(result)
}