package ex_notnull_assertion_operator

import ex_member_function.Building

fun main(args: Array<String>) {
    var obj: Building? = Building()
    obj!!.name = "서울시청"
    println(obj!!.name)

    obj = null
    obj!!.print()
}