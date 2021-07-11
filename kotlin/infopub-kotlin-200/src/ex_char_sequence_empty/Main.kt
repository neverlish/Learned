package ex_char_sequence_empty

fun main(args: Array<String>) {
    val emptyStr = ""
    val whiteSpaces = " "
    val nullStr: String? = null

    println(emptyStr.isEmpty())
    println(whiteSpaces.isEmpty())

    println(emptyStr.isBlank())
    println(whiteSpaces.isBlank())

    println(nullStr.isNullOrEmpty())
    println(nullStr.isNullOrBlank())
}