package ex_access_modifier_private

private var num = 10

private fun print() = println(num)

public fun hello(value: Int) {
    num = value
    print()
}

public class Person(age: Int) {
    public var age = age
        private set

    public val isYoung public get() = age < 30
}