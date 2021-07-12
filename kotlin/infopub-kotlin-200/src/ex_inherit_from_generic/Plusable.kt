package ex_inherit_from_generic

interface Plusable<T> {
    operator fun plus(other: T): T
}