// 클로저 고급

/*
 후행 클로저
 반환타입 생략
 단축 인자이름
 암시적 반환 표현
 */

import Swift

func calculate(a: Int, b: Int, method: (Int, Int) -> Int) -> Int {
    return method(a, b)
}

var result: Int
/*
 후행 클로저
 
 클로저가 함수의 마지막 전달인자라면
 마지막 매개변수 이름을 생략한 후
 함수 소괄호 외부에 클로저를 구현할 수 있습니다
 */

result = calculate(a: 10, b: 10) { (left: Int, right: Int) -> Int in
    return left + right
}
print(result) // 20

/*
 반환타입 생략
 
 calculate 함수의 method 매개변수는
 Int 타입을 반환할 것이라는 사실을 컴파일러도 알기 때문에
 굳이 클로저에서 반환타입을 명시해 주지 않아도 됩니다
 대신 in 키워드는 생략할 수 없습니다
 */

result = calculate(a: 10, b: 10, method: { (left: Int, right: Int) in
    return left + right
})
print(result) // 20

// 후행클로저와 함께 사용할 수도 있습니다
result = calculate(a: 10, b: 10) { (left: Int, right: Int) in
    return left + right
}
print(result) // 20

/*
 단축 인자이름
 클로저의 매개변수 이름이 굳이 불필요하다면 단축 인자이름을 활용할 수 있습니다
 단축 인자이름은 클로저의 매개변수의 순서대로 $0, $1... 처럼 표현합니다
 */

result = calculate(a: 10, b: 10, method: {
    return $0 + $1
})
print(result) // 20

// 당연히 후행 클로저와 함께 사용할 수 있습니다
result = calculate(a: 10, b: 10) {
    return $0 + $1
}
print(result) // 20

/*
 암시적 반환 표현
 클로저가 반환하는 값이 있다면
 클로저의 마지막 줄의 결과값은 암시적으로 반환값으로 취급합니다
 */

result = calculate(a: 10, b: 10) {
    $0 + $1
}
print(result) // 20

// 간결하게 한 줄로 표현해 줄 수도 있습니다
result = calculate(a: 10, b: 10) { $0 + $1 }
print(result) // 20

// 축약하지 않은 클로저 문법과 축약 후의 문법 비교
result = calculate(a: 10, b: 10, method: { (left: Int, right: Int) -> Int in
    return left + right
})

result = calculate(a: 10, b: 10) { $0 + $1 }
print(result) // 20