package chap01.section5

private class PrivateTest {
    private var i = 1

    private fun privateFunc() {
        i += 1
        println(i)
    }

    fun access() {
        privateFunc()
    }
}

class OtherClass {
//    val pc = PrivateTest()
    fun test() {
        val pc = PrivateTest()
        pc.access()
    }
}

fun main() {
    val pc = PrivateTest()

    pc.access()
}

fun topFunction() {
    val pc = PrivateTest()
}
