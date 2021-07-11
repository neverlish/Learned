package ex_delegated_property

import kotlin.reflect.KProperty

class OnlyPositive {
    private var realValue: Int = 0

    operator fun getValue(thisRef: Any?, property: KProperty<*>): Int {
        return realValue
    }

    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        realValue = if (value > 0) value else 0
    }
}