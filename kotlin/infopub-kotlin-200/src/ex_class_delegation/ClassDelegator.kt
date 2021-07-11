package ex_class_delegation

class ClassDelegator: Plusable {
    override fun plus(other: Int): Int {
        println("기본 구현")
        return other
    }
}