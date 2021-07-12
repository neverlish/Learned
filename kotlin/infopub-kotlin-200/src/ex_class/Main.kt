package ex_class

class Person {
    var name: String = ""
    var age: Int = 0
}

fun main(args: Array<String>) {
    val person: Person
    person = Person()
    person.name = "홍길동"
    person.age = 36

    val person2 = Person()
    person2.name = "김미영"
    person2.age = 29

    val person3 = Person()
    person3.name = "John"
    person3.age = 52
}
