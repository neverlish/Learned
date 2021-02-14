package chap02.section2

import kotlin.properties.Delegates

fun main() {
    var max: Int by Delegates.vetoable(0) {
        prop, old, new ->
        new > old
    }

    println(max)
    max = 10
    println(max)

    max = 5

    println(max) // 재할당되지 않으므로 계속 10
}