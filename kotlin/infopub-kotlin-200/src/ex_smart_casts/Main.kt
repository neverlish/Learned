package ex_smart_casts

fun main(args: Array<String>) {
    val number: Int? = null
    val number2 = 1225

    checkNull(number)
    checkNull(number2)
}

fun checkNull(any: Any?) {
    if (any == null) {
        println("null이 들어왔습니다.")
        return
    }
    println(any.toString())
}