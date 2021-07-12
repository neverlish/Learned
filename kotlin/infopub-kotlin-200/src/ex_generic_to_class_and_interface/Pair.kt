package ex_generic_to_class_and_interface

class Pair<A, B>(val first: A, val second: B) {
    override fun toString() = "$first\n$second"
}