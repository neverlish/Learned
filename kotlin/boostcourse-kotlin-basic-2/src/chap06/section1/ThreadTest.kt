package chap06.section1

class SimpleThread: Thread() {
    override fun run() {
        println("Class Thread: ${Thread.currentThread()}")
    }
}

class SimpleRunnable: Runnable {
    override fun run() {
        println("Interface Thread: ${Thread.currentThread()}")
    }
}

fun main() {
    val thread = SimpleThread()
    thread.start()

    val runnable = SimpleRunnable()
    val thread2 = Thread(runnable)
    thread2.start()

    // 익명객체
    object: Thread() {
        override fun run() {
            println("object Thread: ${Thread.currentThread()}")
        }
    }.start()

    // 람다식
    Thread {
        println("Lambda Thread: ${Thread.currentThread()}")
    }.start()
}