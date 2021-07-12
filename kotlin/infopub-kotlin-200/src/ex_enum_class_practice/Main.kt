package ex_enum_class_practice

enum class Mode {
    SELECTION, PEN, SHAPE, ERASER
}

fun main(args: Array<String>) {
    val shapeMode: Mode = Mode.SHAPE
    println(shapeMode.name)
    println(shapeMode.ordinal)

    val modes: Array<Mode> = Mode.values()

    for (mode: Mode in modes)
        println(mode)

    println(Mode.valueOf("PEN").ordinal)
}