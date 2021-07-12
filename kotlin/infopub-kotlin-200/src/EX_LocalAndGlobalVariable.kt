var count = 0

fun main(args: Array<String>): Unit {
    val a = 15
    println(a)

    count += 1
    printCount()
    println(count)
}

fun printCount() {
    println(count)
    count += 1
}