package ex_property_in_constructor

class Car(val name: String, val speed: Int = 0)

fun main(args: Array<String>) {
    val car = Car("My Car")
    println(car.name)
    println(car.speed)
}