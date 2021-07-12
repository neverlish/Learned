package ex_closed_range_interface

fun main(args: Array<String>) {
    val intRange: IntRange = 1..10
    val longRange: LongRange = 1L..100L
    val charRange: CharRange = 'A'..'Z'

    println(intRange.start)
    println(longRange.endInclusive)
    println('*' in charRange)
    println(charRange.isEmpty())
}