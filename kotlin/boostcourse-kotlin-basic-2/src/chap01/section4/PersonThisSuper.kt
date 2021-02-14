package chap01.section4

open class Person {
    constructor(firstName: String) {
        println("[Person] firstName: $firstName")
    }

    constructor(firstName: String, age: Int) {
        println("[Person] firstName: $firstName, $age")
    }
}

class Developer: Person {
    constructor(firstName: String): this(firstName, 10) {
        println("[Developer] $firstName")
    }

    constructor(firstName: String, age: Int): super(firstName, age) {
        println("[Developer] $firstName, $age")
    }
}

fun main() {
    val sean = Developer("Sean")
}