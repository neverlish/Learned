package ex_java_to_kotlin_sam_conversion

fun main(args: Array<String>) {
    val runnable: Runnable = Runnable { println("SAM") }
    runnable.run()
}