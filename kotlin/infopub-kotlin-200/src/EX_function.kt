fun main(args: Array<String>): Unit {
    println(myFunction())
    println(myFunction() + 10)
}

fun myFunction(): Int {
    val a = 3
    val b = 6
    println("a: " + a + ", b:" + b)
    return a + b
}