package ex_kotlin_in_out

class AAA<out T>
class BBB<in T>

fun main(args: Array<String>) {
    val aaaSub = AAA<Int>()
    val aaaSuper: AAA<Any> = aaaSub

    val bbbSuper = BBB<Any>()
    val bbbSub: BBB<Int> = bbbSuper

    val start: AAA<*> = aaaSub
}