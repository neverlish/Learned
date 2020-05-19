package chap05.section2

fun main() {
    do {
        println("Enter the number: ")
        val input = readLine()!!.toInt()

        for (i in 0..(input-1)) {
            for (j in 0..(input-1)) {
                println((i+j)%(input+1))
            }
            println()
        }
    } while (input != 0)
}