package chap03.section1

interface A {
    fun functionA() {}
}

interface B {
    fun functionB() {}
}

class C(val a: A, val b: B) {
    fun functionC() {
        a.functionA()
        b.functionB()
    }
}

class DelegatedC(a: A, b: B): A by a, B by b {
    fun functionC() {
        functionA()
        functionB()
    }
}