package chap02.section2

interface Car {
    fun go(): String
}

class VanImpl(val power: String): Car {
    override fun go(): String = "는 짐을 적재하며 $power 마력을 가집니다."
}

class SportImpl(val power: String): Car {
    override fun go(): String = "는 경주용에 사용되며 $power 마력을 가집니다."
}

class CarModel(val model: String, private val impl: Car): Car by impl {
//    override fun go(): String {
//        return "TEST"
//    }

    fun carInfo() {
        println("$model ${go()}")
    }
}

fun main() {
    val myDamas = CarModel("Damas", VanImpl("100마력"))
    val my350z = CarModel("350Z 2008", SportImpl("350마력"))

    myDamas.carInfo()
    my350z.carInfo()
}