package chap02.section2

import kotlin.properties.Delegates

class User {
    var name: String by Delegates.observable("NONAME") {
        prop, old, new ->
        println("$old -> $new")
    }
}

fun main() {
    val user = User()
    user.name = "Kildong"
    user.name = "Dooly"
}