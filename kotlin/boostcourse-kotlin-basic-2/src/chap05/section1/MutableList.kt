package chap05.section1

fun main() {
    val mutableList: MutableList<String> = mutableListOf<String>("Kildong", "Dooly", "Chelsu")
    mutableList.add("Ben")
    mutableList.removeAt(1)
    mutableList[0] = "Sean"

    println(mutableList)

    val mutableListMixed = mutableListOf("Android", "Apple", 5, 6, 'X')
}