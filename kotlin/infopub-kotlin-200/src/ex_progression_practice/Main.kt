package ex_progression_practice

fun IntProgression.print() {
    print("first: ${this.first}")
    print("last: ${this.last}")
    println("step: ${this.step}")

    for (i in this)
        print("$i ")
    println("\n")
}

fun main(args: Array<String>) {
    val prog: IntProgression = 7 downTo 3
    prog.print()

    val prog2: IntProgression = (3..7).reversed()
    println(prog == prog2)
    prog2.print()

    val prog3: IntProgression = (1..10) step 3
    prog3.print()

    val prog4: IntProgression = 10 downTo 2 step 3
    prog4.print()

    val prog5: IntProgression = 2 until 5
    prog5.print()
}