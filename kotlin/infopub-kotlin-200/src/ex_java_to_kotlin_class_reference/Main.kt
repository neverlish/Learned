package ex_java_to_kotlin_class_reference

fun main(args: Array<String>) {
    val number: Int = 26
    val str: String = "2018년"

    JavaClass.printClassInfo(number::class.java)
    JavaClass.printClassInfo(str::class.java)
    JavaClass.printClassInfo(Double::class.java)
}