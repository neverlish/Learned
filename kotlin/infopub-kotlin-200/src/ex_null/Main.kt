package ex_null

import ex_upcasting.Person

fun main(args: Array<String>) {
    var person: Person? = Person("K", 30)
    person = null

    var num: Int? = null
    num = 10
}