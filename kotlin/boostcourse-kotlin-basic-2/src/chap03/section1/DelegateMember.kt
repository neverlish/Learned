package chap03.section1

interface Nameable {
    var name: String
}

class StaffName: Nameable {
    override var name: String = "Sean"
}

interface Runnable {
    fun run()
}

class Work: Runnable {
    override fun run() {
        println("work...")
    }
}

class Person(name: Nameable, work: Runnable): Nameable by name, Runnable by work

fun main() {
    val person = Person(StaffName(), Work())

    println(person.name)
    person.run()
}