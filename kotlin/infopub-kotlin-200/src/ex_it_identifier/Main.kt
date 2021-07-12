package ex_it_identifier

fun main(args: Array<String>) {
    val instanceFunc: (Int) -> Unit = {
        println("Hello $it")
    }

    instanceFunc(30)
}