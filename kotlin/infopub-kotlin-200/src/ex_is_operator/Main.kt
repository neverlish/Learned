package ex_is_operator

import ex_inheritance.Person
import ex_inheritance.Student

class Professor(name: String, age: Int): Person(name, age)

fun main(args: Array<String>) {
    val person: Person = Student("Mark Zuckerberg", 33, 20171225)
    println("${person is Person}")
    println("${person is Student}")
    println("${person is Professor}")

    val person2: Person = Professor("Kim", 48)
    println("${person2 is Person}")
    println("${person2 is Student}")
    println("${person2 is Professor}")
}