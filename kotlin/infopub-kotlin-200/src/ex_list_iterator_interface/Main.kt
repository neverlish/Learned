package ex_list_iterator_interface

private fun moveToNext(iter: ListIterator<Int>) {
    print("${iter.hasPrevious()},")
    print("${iter.hasNext()},")
    print("${iter.previousIndex()},")
    print("${iter.nextIndex()},")
    println("${iter.next()}")
}

fun main(args: Array<String>) {
    val iter: ListIterator<Int> = listOf(10, 20, 30).listIterator()

    moveToNext(iter)
    moveToNext(iter)
    moveToNext(iter)
}