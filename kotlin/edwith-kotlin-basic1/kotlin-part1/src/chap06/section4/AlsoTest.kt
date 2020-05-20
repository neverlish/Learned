package chap06.section4

fun main() {
    data class Person(var name: String, var skills: String)

    val person = Person("KilDong", "Kotlin")

    val a = person.also {
        it.skills = "Java"
        "Success"
    }

    println("a $a")
    println("person $person")

}