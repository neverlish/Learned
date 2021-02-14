package chap04.section1

open class Animal(val size: Int) {
    fun feed() = println("Feeding...")
}

class Cat(val jump: Int): Animal(50)

class Spider(val poison: Boolean): Animal(1)

class Box2<out T: Animal>(val element: T) {
    fun getAnimal(): T = element // out은 반환 자료형에만 사용할 수 있음
//    fun set(new: T) { // T는 in 위치에 사용할 수 없음
//        element = new
//    }
}

fun main() {
    val c1 = Cat(10)
    val s1 = Spider(true)

    var a1: Animal = c1
    a1 = s1
    println("s1 ${a1.size} ${a1.poison}")

//    val b1: Box2<Cat> = Box2<Animal>()
    val b2: Box2<Animal> = Box2<Cat>(Cat(10))
    val b3 = Box2<Spider>(Spider(true))
//    val b4: Box2<Number> = Box2<Int>()
}