package chap03.section3

fun highFunc(a: Int, b: Int, sum: (a: Int, b: Int) -> Int): Int {
    return sum(a, b)
}

fun main() {
    val result = highFunc(1, 3) {a, b ->
        a + b
    }
    println(result)
}