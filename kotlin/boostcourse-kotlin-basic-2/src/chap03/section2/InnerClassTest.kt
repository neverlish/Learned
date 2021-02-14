package chap03.section2

interface Switcher {
    fun on(): String
}

class SmartPhone(val model: String) {
    private val cpu = "Exynos"

    inner class ExternalStorage(val size: Int) {
        fun getInfo() = "${model}: Installed on $cpu with ${size}Gb"
    }

    fun powerOn(): String {
        class Led(val color: String) {
            fun blink(): String = "Blinking $color on $model"
        }

        val powerStatus = Led("Red")

        val powerSwitch = object: Switcher {
            override fun on(): String {
                return powerStatus.blink()
            }
        }
        return powerSwitch.on()
    }
}

fun main() {
    val mySdcard = SmartPhone("S7").ExternalStorage(32)

    println(mySdcard.getInfo())

    val myphone = SmartPhone("Note9")
    myphone.ExternalStorage(128)
    println(myphone.powerOn())
}