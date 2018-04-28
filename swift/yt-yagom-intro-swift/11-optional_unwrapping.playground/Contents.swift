// 옵셔널 추출

/*
 Optional Binding
 
 옵셔널의 값을 꺼내오는 방법 중 하나
 nil 체크 + 안전한 값 추출
 */

func printName(_ name: String) {
    print(name)
}

var myName: String? = nil
//printName(myName)

if let name: String = myName {
    printName(name)
} else {
    print("myName === nil")
} // myName === nil

// name 상수는 if-let 구문 내에서만 사용 가능합니다
// 상수 사용 범위를 벗어났기 때문에 컴파일 오류 발생
//printName(name)

var myName2: String? = "yagom"
var yourName: String? = nil

if let name = myName2, let friend = yourName {
    print("\(name) and \(friend)")
}

yourName = "hana"

if let name = myName2, let friend = yourName {
    print("\(name) and \(friend)")
} // yagom and hana

/*
 Force Unwrapping
 
 옵셔널의 값을 강제로 추출
 */

var myName3: String? = "yagom"
printName(myName3!)

myName3 = nil
//printName(myName3!) 
// 강제추출시 값이 없으므로 런타임 오류 발생
 var yourName2: String! = nil
//printName(yourName)
// nil 값이 전달되기 때문에 런타임 오류 발생