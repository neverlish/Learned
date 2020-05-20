package chap02.section3

fun main() {
    var str1: String?
    str1 = "Hello"
    var len = str1?.length ?: -1
    println("str1: $str1, length: $len")
}