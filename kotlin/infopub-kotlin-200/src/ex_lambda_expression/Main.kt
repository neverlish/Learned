package ex_lambda_expression

fun main(args: Array<String>) {
    val instanceFunc: (Int) -> Unit
    instanceFunc = { number: Int ->
        println("Hello $number")
    }
    instanceFunc(30)
    instanceFunc.invoke(33)
}