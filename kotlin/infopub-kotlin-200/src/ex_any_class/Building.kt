package ex_any_class

class Building(val name: String = "",
               val date: String = "",
               val area: Int = 0) {
    override fun toString() =
        "이름: ${this.name}\n" +
        "건축일자: ${this.date}\n" +
        "면적: ${this.area}"

}