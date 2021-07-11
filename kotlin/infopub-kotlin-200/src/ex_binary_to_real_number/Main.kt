package ex_binary_to_real_number

fun main(args: Array<String>) {
    val realNumber: Float = Float.fromBits(0b01000001_00100111_10101110_00010100)
    println(realNumber)
}