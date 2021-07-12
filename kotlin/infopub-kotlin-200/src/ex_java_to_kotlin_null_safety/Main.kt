package ex_java_to_kotlin_null_safety

class KotlinClass: JavaInterface {
    override fun trim(str: String?): String =
        str?.trim() ?: ""

}

fun main(args: Array<String>) {
    val javaInterface: JavaInterface = KotlinClass()
    println(javaInterface.trim(" hi "))
}