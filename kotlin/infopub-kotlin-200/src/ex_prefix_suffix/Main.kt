package ex_prefix_suffix

fun main(args: Array<String>) {
    val str: CharSequence = "https://www.naver.com"

    println(str.startsWith("https://"))
    println(str.endsWith(".com"))

    println(str.removePrefix("https://"))
    println(str.removeSuffix(".com"))
    println(str.removeSurrounding("https://", ".com"))
}