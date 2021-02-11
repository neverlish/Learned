package chap03.section1

interface Pet {
    var category: String
    val msgTags: String
        get() = "I'm your lovely pet!"

    val species: String

    fun feeding()
    fun patting() {
        println("Keep patting!")
    }
}

class Cat(name: String, override var category: String): Pet {
    override var species: String = "cat"

    override fun feeding() {
        println("Feed the cat a tuna can!")
    }
}