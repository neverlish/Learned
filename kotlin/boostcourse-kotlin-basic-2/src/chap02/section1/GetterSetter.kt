package chap02.section1

class Person(var id: Int, val name: String, val age: Int)

fun main() {
    val person = Person(1, "Kildong", 30)

    person.id = 2

    println(person.id)
}