package ex_anonymouns_function

fun main(args: Array<String>) {
    val instanceFunc: (Int) -> Unit = fun(number: Int): Unit {
        println("Hello $number")
    }
    instanceFunc(30)
    instanceFunc.invoke(33)
}