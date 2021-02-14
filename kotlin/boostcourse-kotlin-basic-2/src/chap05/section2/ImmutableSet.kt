package chap05.section2

fun main() {
    val mixedTypeSet = setOf("Hello", 5, "world", 3.14, 'c')
    var intSet: Set<Int> = setOf<Int>(1, 5, 5)
    println(mixedTypeSet)
    println(intSet)
}