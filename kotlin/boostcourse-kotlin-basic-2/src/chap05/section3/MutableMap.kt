package chap05.section3

fun main() {
    val capitalCityMap: MutableMap<String, String>
        = mutableMapOf("Korea" to "Seooul", "China" to "Beijing", "Japan" to "Tokyo")

    println(capitalCityMap.values)
    println(capitalCityMap.keys)
    capitalCityMap.put("UK", "London")
    capitalCityMap.remove("china")
    println(capitalCityMap)
}