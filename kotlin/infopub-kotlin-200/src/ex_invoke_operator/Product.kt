package ex_invoke_operator

class Product(val id: Int, val name: String) {
    operator fun invoke(value: Int) {
        println(value)
        println("id: $id\nname: $name")
    }
}