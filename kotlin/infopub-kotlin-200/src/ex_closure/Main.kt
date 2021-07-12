package ex_closure

fun returnFunc(num: Int): () -> Unit = { println(num) }

fun main(args: Array<String>) {
    val f: () -> Unit = returnFunc(30)
    f()
}