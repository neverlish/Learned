package chap04.section1

class Calc<T: Number> {
    fun plus(arg1: T, arg2: T): Double {
        return arg1.toDouble() + arg2.toDouble()
    }
}

fun main() {
    val calc = Calc<Int>()
    println(calc.plus(10, 20))

    val calc2 = Calc<Double>()
    val calc3 = Calc<Long>()
//    val calc4 = Calc<String>() 오류 발생

    println(calc2.plus(2.5, 3.5))
    println(calc3.plus(5L, 10L))
}