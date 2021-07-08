package ex_extension_function_inherit_relation

open class AAA; class BBB: AAA()

fun AAA.hello() = println("AAA")
fun BBB.hello() = println("BBB")

fun main(args: Array<String>) {
    val test: AAA = BBB()
    test.hello()
}