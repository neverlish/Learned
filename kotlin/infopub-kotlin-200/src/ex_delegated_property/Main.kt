package ex_delegated_property

fun main(args: Array<String>) {
    val sample = Sample()
    sample.number = -50
    println(sample.number)

    sample.number = 100
    println(sample.number)
}