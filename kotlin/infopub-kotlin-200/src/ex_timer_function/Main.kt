package ex_timer_function

import java.util.Timer
import kotlin.concurrent.timer

fun main(args: Array<String>) {
    var i = 1
    val t: Timer = timer(initialDelay = 1500, period = 250) {
        println(i)
        i += 1
    }

    Thread.sleep(2400)
    t.cancel()
}