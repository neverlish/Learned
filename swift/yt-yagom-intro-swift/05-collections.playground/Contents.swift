// 컬렉션 타입
// Array, Dictionary, Set

import Swift

/*
 Array - 순서가 있는 리스트 컬렉션
 Dictionary - 키와 값의 쌍으로 이루어진 컬렉션
 Set - 순서가 없고, 멤버가 유일한 컬렉션
*/

// Array
// 빈 Int Array 생성
var integers: Array<Int> = Array<Int>()
integers.append(1)
integers.append(100)
//integers.append(100.1)

integers.contains(100) // true
integers.contains(99) // false
integers.remove(at: 0)
integers.removeLast()
integers.removeAll()

integers.count

//integers[0]

// Array<Double>와 [Double]는 동일한 표현
// 빈 Double Array 생성
var doubles: Array<Double> = [Double]()

// 빈 String Array 생성
var strings: [String] = [String]()

// 빈 Character Array 생성
// [] 는 새로운 빈 Array
var characters: [Character] = []

// let을 사용하여 Array를 선언하면 불변 Array
let immutableArray = [1, 2, 3]

//immutableArray.append(4)
//immutableArray.removeAll()

// Dictionary
// Key가 String 타입이고 Value가 Any인 빈 Dictionary 생성
var anyDictionary: Dictionary<String, Any> = [String: Any]()
anyDictionary["someKey"] = "value"
anyDictionary["anotherKey"] = 100

anyDictionary

anyDictionary["someKey"] = "dictionary"
anyDictionary

anyDictionary.removeValue(forKey: "anotherKey")
anyDictionary["someKey"] = nil
anyDictionary

let emptyDictionary: [String: String] = [:]
let initializedDictionary: [String: String] = ["name": "yagom", "gender": "male"]

//emptyDictionary["key"] = "value"
//let someValue: String = initializedDictionary["name"]
let someValue: String = initializedDictionary["name"]!

// Set
// 빈 Int Set 생성
var integerSet: Set<Int> = Set<Int>()
integerSet.insert(1)
integerSet.insert(100)
integerSet.insert(99)
integerSet.insert(99)
integerSet.insert(99)

integerSet // {100, 99, 1}
integerSet.contains(1) // true
integerSet.contains(2) // false

integerSet.remove(100)
integerSet.removeFirst()

integerSet.count // 1

let setA: Set<Int> = [1, 2, 3, 4, 5] // {5, 2, 3, 1, 4}
let setB: Set<Int> = [3, 4, 5, 6, 7] // {5, 6, 7, 3, 4}

let union: Set<Int> = setA.union(setB) // {2, 4, 5, 6, 7, 3, 1}
let sortedUnion: [Int] = union.sorted() // [1, 2, 3, 4, 5, 6, 7]

let intersection: Set<Int> = setA.intersection(setB) // {5, 3, 4}
let subtracting: Set<Int> = setA.subtracting(setB) / {2, 1}