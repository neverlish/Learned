package ex_import
import ex_package.max
import ex_package.min as ex_min

fun main(args: Array<String>) {
    println(max(55, 47))
    println(ex_min(3, 10))
}