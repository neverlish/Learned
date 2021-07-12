package ex_companion_object

class Person private constructor() {
    companion object {
        fun create(): Person {
            countCreated += 1
            return Person()
        }

        var countCreated = 0
            private set
    }
}

fun main(args: Array<String>) {
    val a = Person.create()
    val b = Person.create()
    println(Person.countCreated)
}