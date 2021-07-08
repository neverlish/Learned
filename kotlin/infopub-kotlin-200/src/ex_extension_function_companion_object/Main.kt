package ex_extension_function_companion_object

class Person { companion object }

fun Person.Companion.create() = Person()

fun main(args: Array<String>) = Person.create()