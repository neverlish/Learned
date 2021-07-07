package ex_object_extends_class

open class Person(val name: String, val age: Int) {
    open fun print() {
        println("이름: $name")
        println("나이: $age")
    }
}

fun main(args: Array<String>) {
    val custom: Person = object : Person("Alan", 23) {
        override fun print() {
            println("It's a object")
        }
    }

    custom.print()
}