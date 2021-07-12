package ex_for

fun main(args: Array<String>) {
    for(i: Int in 1..10)
        println("$i ")
    println()

    for (i: Int in 1..10) {
        if (i > 5)
            break
        println("$i ")
    }
}