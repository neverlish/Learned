package ex_destructing_object

data class Employee(val name: String, val age: Int, val salary: Int)

fun main(args: Array<String>) {
    val (name, _, salary) = Employee("John", 30, 3300)
    println(name)
    println(salary)
}