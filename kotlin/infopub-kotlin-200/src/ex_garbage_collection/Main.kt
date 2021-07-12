package ex_garbage_collection

fun main(args: Array<String>) {
    var result = ""
    var i = 1

    while (i <= 100) {
        result += "$i"
        i += 1
    }

    println(result)
}