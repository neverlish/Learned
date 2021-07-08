package ex_inner_class

class Outer(private val value: Int) {
    fun print() {
        println(this.value)
    }

    inner class Inner(private val innerValue: Int) {
        fun print() {
            this@Outer.print()
            println(this.innerValue + this@Outer.value)
        }
    }
}

fun main(args: Array<String>) {
    val instance: Outer = Outer(610)
    val innerInstance: Outer.Inner = instance.Inner(40)
    innerInstance.print()
}