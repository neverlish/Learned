package ex_overriding

open class AAA {
    open fun func() = println("AAA")
}

class BBB : AAA() {
    override fun func() {
        super.func()
        println("BBB")
    }
}

fun main(args: Array<String>) {
    AAA().func()
    BBB().func()
}