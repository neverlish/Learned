fun main(args: Array<String>): Unit {
    val a: Int
    var b: Int

    a = 10 + 5
    b = 10

    b += a
    println(b)

    b %= 3
    println(b)
}