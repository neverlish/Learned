package ex_trim_char_sequence

fun main(args: Array<String>) {
    val str = " hello "

    println(str.removeRange(0..5))

    println(str.padStart(20, '*'))
    println(str.padEnd(17, '*'))

    println(str.trimStart())
    println(str.trimEnd())
    println(str.trim())

    println(str.slice(4..6))
    println(str.subSequence(4..6))
    println(str.substring(4..6))

    println(str.reversed())
}