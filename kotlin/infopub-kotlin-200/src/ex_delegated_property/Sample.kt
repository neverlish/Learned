package ex_delegated_property

class Sample {
    var number: Int by OnlyPositive()
}