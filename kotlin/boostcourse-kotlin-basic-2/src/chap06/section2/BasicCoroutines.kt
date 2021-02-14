package chap06.section2

import kotlinx.coroutines.*

fun main() {
    runBlocking {
        val job = GlobalScope.launch {
            delay(1000L)
            println("World!")
            doSomething()
        }
        println("Hello,")
        println("job: ${job.isActive}, ${job.isCompleted}")
    //    Thread.sleep(2000L)
        job.join()
        println("job: ${job.isActive}, ${job.isCompleted}")
    }
}

suspend fun doSomething() {
    println("Do Something")
}