fun main(args: Array<String>): Unit {
    println(getSumOf(1, 2, 3, 4, 5, 6, 7))
    println(getSumOf(32, 57, 12))
    println(getSumOf())
}

fun getSumOf(vararg numbers: Int): Int {
    val count = numbers.size
    var i = 0
    var sum = 0

    while (i < count) {
        sum += numbers[i]
        i += 1
    }

    return sum
}