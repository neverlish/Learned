package ex_regex_class

fun main(args: Array<String>) {
    val regex = Regex("[0-9]+")
    val str = "4324235"
    val str2 = "324 6546 5432"

    println(regex matches str)
    println(regex matches str2)
    println(regex.replace(str2, "숫자"))
}