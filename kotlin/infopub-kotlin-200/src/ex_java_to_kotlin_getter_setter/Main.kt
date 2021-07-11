package ex_java_to_kotlin_getter_setter

fun main(args: Array<String>) {
    val java = JavaClass()

    java.something = 301
    println(java.something)

    println(java.isGood)
    println(java.doubleValue)
}