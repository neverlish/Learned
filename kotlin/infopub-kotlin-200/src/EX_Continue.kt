fun main(args: Array<String>): Unit {
    var i = 0

    while (i < 10) {
        i += 1
        if (i % 2 == 0)
            continue
        println(i)
    }
}