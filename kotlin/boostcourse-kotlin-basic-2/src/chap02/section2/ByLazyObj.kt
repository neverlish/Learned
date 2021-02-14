package chap02.section2

class Person2(val name: String, val age: Int)

fun main() {
    var isPersonInstantiated: Boolean = false

    val person : Person2 by lazy {
        isPersonInstantiated = true
        Person2("Kim", 23)
    }

    val personDeletage = lazy { Person2("Hong", 40) }

    println("person Init: $isPersonInstantiated")
    println("personDelegate Init: ${personDeletage.isInitialized()}")

    println("person.name = ${person.name}")
    println("personDelegate.value.name = ${personDeletage.value.name}")

    println("person Init: $isPersonInstantiated")
    println("personDelegate Init: ${personDeletage.isInitialized()}")
}