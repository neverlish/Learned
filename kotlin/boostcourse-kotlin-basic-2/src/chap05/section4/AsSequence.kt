package chap05.section4

fun main() {
    val list1 = listOf(1, 2, 3, 4, 5)
    val listDefault = list1
        .map { println("map($it) "); it * it }
        .filter { println("filter($it)"); it % 2 == 0 }

    println(listDefault)

    val listSeq = list1.asSequence()
        .map { println("map($it) "); it * it }
        .filter { println("filter($it)"); it % 2 == 0 }
        .toList()

    println(listSeq)
}