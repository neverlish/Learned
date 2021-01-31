package chap02.section3

object OCustomer {
    var name = "Kildong"
    fun greeting() = println("Hello World!")
    val HOBBY = Hobby("BasketBall")

    init {
        println("Init!")
    }
}

class Hobby(val name: String)

fun main() {
    OCustomer.greeting()
    OCustomer.name = "Dooly"
    println("name = ${OCustomer.name}")
    println(OCustomer.HOBBY.name)
}