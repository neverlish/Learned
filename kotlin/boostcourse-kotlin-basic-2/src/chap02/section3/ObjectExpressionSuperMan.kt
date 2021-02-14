package chap02.section3

open class Superman() {
    fun work() = println("Taking photos")
    fun talk() = println("Talking with people.")
    open fun fly() = println("Flying in the air.")
}

fun main() {
    val pretentedMan = object: Superman() {
        override fun fly() = println("I'm not a real superman. I can't fly!")
    }

    pretentedMan.work()
    pretentedMan.talk()
    pretentedMan.fly()
}