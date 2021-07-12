fun main(args: Array<String>): Unit {
    var ch: Char = 'A'
    println(ch)

    ch = '\uAC00'
    println(ch)

    ch = '한'
    println(ch.toInt())
}