package chap05.section2

fun main() {
    var total = 0

    for (num in 0..99 step 2) {
        total += num
    }

    println("total: $total")
}