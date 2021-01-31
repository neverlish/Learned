package chap01.section3

open class Bird(var name: String, val wing: Int, var beak: String) {
    fun fly() {
        println("Fly")
    }
}

class Lark(name: String, wing: Int, beak: String) : Bird(name, wing, beak) {
    fun singHitone() {
        println("sing Hitone")
    }
}

class Parrot : Bird {
    var language: String

    constructor(name: String, wing: Int, beak: String, language: String) : super(name, wing, beak) {
        this.language = language
    }

    fun speak() {
        println("Speak: $language")
    }
}

fun main() {
    val lark = Lark("mylark", 2, "short")
    val parrot = Parrot("myparrot", 2, "long", "English")

    println("lark - name: ${lark.name}")
    println("parrot - name: ${parrot.name}, lang: ${parrot.language}")

    lark.singHitone()
    lark.fly()

    parrot.speak()
    parrot.fly()
}