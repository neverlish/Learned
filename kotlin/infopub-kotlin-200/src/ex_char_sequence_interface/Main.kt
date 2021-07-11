package ex_char_sequence_interface

fun main(args: Array<String>) {
    val seq: CharSequence = "Hello"
    println(seq.length)
    println(seq[2])
    println(seq.subSequence(1, 4))
}