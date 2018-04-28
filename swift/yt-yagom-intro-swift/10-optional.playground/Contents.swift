// 옵셔널

let optionalConstant: Int? = nil
//let someConstant: Int = nil

// someOptionalParam can be nil
func someFunction(someOptionalParam: Int?) {

}

// someParam must not be nil
func someFunction2(someParam: Int) {
    
}

someFunction(someOptionalParam: nil)
//someFunction2(someParam: nil)

/*
 enum Optional<Wrapped>: ExpressibleByNilLiteral {
    case none
    case some(Wrapped)
 }

 let optionalValue: Optional<Int> = nil
 let optionalValue2: Int? = nil
 */

// 암시적 추출 옵셔널

var optionalValue: Int! = 100

switch optionalValue {
case .none:
    print("This Optional variable is nil")
case .some(let value):
    print("Value is \(value)")
} // Value is 100

// 기존 변수처럼 사용 가능
optionalValue = optionalValue + 1

// nil 할당 가능
optionalValue = nil

// 잘못된 접근으로 인한 런타임 오류 발생
//optionalValue = optionalValue + 1

// 일반적 옵셔널
var optionalValue2: Int? = 100
switch optionalValue2 {
case .none:
    print("This Optional variable is nil")
case .some(let value):
    print("Value is \(value)")
} // Value is 100

// nil 할당 가능
optionalValue2 = nil

// 기존 변수처럼 사용 불가 - 옵셔널과 일반 값은 다른 타입이므로 연산 불가
//optionalValue2 = optionalValue2 + 1
