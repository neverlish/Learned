package ex_threa_function

import kotlin.concurrent.thread

fun main(args: Array<String>) {
    thread(start = true) {
        print("Hello, ")
        Thread.sleep(1000)
        print("World!")
    }

    Thread.sleep(500)
    print("Kotlin ")
}