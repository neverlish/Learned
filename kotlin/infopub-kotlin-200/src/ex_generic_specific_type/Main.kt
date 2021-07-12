package ex_generic_specific_type

fun <T: ValueContainer> T.printValue() {
    println(this.getValue())
}

fun main(args: Array<String>) {
    AAA().printValue()
    BBB().printValue()
}