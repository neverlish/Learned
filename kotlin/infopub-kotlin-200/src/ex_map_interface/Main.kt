package ex_map_interface

fun main(args: Array<String>) {
    val map: Map<String, String> = mapOf("Apple" to "사과", "Banana" to "바나나")

    println(map.size)
    println(map.keys)
    println(map.values)
    println(map.entries)
    println(map.isEmpty())
    println(map.containsKey("Cocoa"))
    println(map.containsValue("바나나"))
    println(map["Apple"])
    println(map.getOrDefault("Cocoa", "코코아"))
}