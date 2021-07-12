package ex_member_function

fun main(args: Array<String>) {
    val building = Building()
    building.name = "A 오피스텔"
    building.date = "2017-12-13"
    building.area = 120 * 8

    building.print()
}