package ex_triple

fun calculateCircle(radius: Int): Triple<Int, Double, Double> =
    Triple(radius * 2, radius * 2 * 3.14, 3.14 * radius * radius)

fun main(args: Array<String>) {
    val (diameter, _, area) = calculateCircle(5)
    println("지름: $diameter")
    println("넓이: $area")
}