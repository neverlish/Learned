package chap04.section1

open class Parent

class Child: Parent()

class Cup<T>

fun main() {
    val obj1: Parent = Parent()
    val obj2: Parent = Child()

    val obj3: Cup<Parent> = Cup<Parent>()
//    val obj4: Cup<Parent> = Cup<Child>() 에러 발생. 가능하게 하려면 in, out 사용 필요
}