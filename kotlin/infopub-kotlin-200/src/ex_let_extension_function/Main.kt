package ex_let_extension_function

fun main(args: Array<String>) {
    val a = 10
    val b =5

    (a * b - 2 * a).let { result: Int ->
        if (result > 0)
            println(result)
    }
}