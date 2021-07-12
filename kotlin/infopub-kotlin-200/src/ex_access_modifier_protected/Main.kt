package ex_access_modifier_protected

open class AAA(protected val number: Int)

class BBB(number: Int) : AAA(number) {
    fun printNumber() {
        println(number)
    }
}

fun main(args: Array<String>) {
    val test = BBB(36)
//    println(test.number)

    test.printNumber()
}