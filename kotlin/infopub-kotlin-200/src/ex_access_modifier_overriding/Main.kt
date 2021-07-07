package ex_access_modifier_overriding

open class AAA(protected open val number: Int) {
    protected open fun hello() {
        println("hello")
    }
}

class BBB(number: Int) : AAA(number) {
    public override val number: Int
        get() = super.number

    public override fun hello() = super.hello()
}

fun main(args: Array<String>) {
    val b = BBB(26)
    val a: AAA = b

//    println(a.number)
//    a.hello()
    println(b.number)
    b.hello()
}