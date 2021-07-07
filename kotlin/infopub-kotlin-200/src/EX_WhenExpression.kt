fun main(args: Array<String>): Unit {
    val score = 95

    val grade: Char = when (score / 10) {
        6 -> 'D'
        7 -> 'C'
        8 -> 'B'
        9, 10 -> 'A'
        else -> 'F'
    }

    println(grade)
}