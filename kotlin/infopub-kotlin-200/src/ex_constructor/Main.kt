package ex_constructor

class Person constructor(name: String, age: Int) {
    val name: String
    val age: Int

    init {
        this.name = name
        this.age = age
    }
}

fun main(args: Array<String>) {
    val person = Person("홍길동", 46)

    println("이름: ${person.name}")
    println("나이: ${person.age}")
}