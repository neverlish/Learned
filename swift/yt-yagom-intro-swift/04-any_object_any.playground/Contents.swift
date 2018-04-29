/* Any, AnyObject, nil */

import Swift

/*
 Any - Swift의 모든 타입을 지칭하는 키워드
 AnyObject - 모든 클래스 타입을 지칭하는 키워드
 nil - 없음을 의미하는 키워드
*/

// MARK: - Any
var someAny: Any = 100
someAny = "어떤 타입도 수용 가능합니다"
someAny = 123.12

// let someDouble: Double = someAny
let someDouble: Double = someAny as! Double

// MARK: - AnyObject

class SomeClass {}

var someAnyObject: AnyObject = SomeClass()
//someAnyObject = 123.12

// MARK: - nil

// someAny = nil
// someAnyObject = nil
