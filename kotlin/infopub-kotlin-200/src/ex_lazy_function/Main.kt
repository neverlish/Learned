package ex_lazy_function

class AAA {
    var num: Int = 0
    val num2 by lazy { num * 5 }
}

fun main(args: Array<String>) {
    val one = AAA()
    println(one.num2)
    one.num = 10
    println(one.num2)

    val two = AAA()
    two.num = 4
    println(two.num2)
}