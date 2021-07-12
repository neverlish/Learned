package ex_higher_order_function

fun decorate(task: () -> Unit) {
    println("=== 작업 시작 ===")
    task()
    println("=== 작업 끝 ===")
}

fun main(args: Array<String>) {
    decorate({
        val a = 10; val b = 5
        println("$a + $b = ${a + b}")
    })
    decorate({
        println("some"); println("tasks")
    })
}