package ex_iterable_interface

fun main(args: Array<String>) {
    val prog: IntProgression = 3..7
    println(prog.first)
    println(prog.last)
    println(prog.step)

    for (i in prog)
        println("$i ")
}