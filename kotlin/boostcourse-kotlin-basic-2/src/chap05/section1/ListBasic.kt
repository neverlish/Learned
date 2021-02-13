package chap05.section1

fun main() {
    var numbers: List<Int> = listOf(1, 2, 3, 4, 5)
    var names: List<String> = listOf("one", "two", "three")

    var mixed = listOf("One", 1, 1.5, 'c')

    println("numbers: $numbers")
    println("names: $names")
    println("mixed: $mixed")

    println(numbers.size)
    println(numbers.indexOf(3))
    println(numbers.get(0))
    println(numbers[0])
    println(numbers.contains(1))

    for (name in names) {
        println(name)
    }

    for (num in numbers) print(num)

    println()
}