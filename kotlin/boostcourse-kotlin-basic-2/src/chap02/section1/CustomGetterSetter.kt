package chap02.section1

class User2(_id: Int, _name: String, _age: Int) {
    val id: Int = _id
    var name: String = _name
        set(value) {
            println("The name was changed")
            field = value.toUpperCase()
        }

    var age: Int = _age
}

fun main() {
    val user1 = User2(1, "Kildong", 30)
    user1.name = "coco"
    println("user1.name = ${user1.name}")
}