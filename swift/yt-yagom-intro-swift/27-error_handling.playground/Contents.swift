/*
 오류처리
 
 Error 프로토콜과 (주로) 열거형을 통해서 오류를 표현합니다
 
 enum 오류종류이름: Error {
 case 종류1
 case 종류2
 case 종류3
 ...
 }
 */

import Swift

// 자판기 동작 오류의 종류를 표현한 VendingMachineError 열거형
enum VendingMachineError: Error {
    case invalidInput
    case insufficientFunds(moneyNeeded: Int)
    case outOfStock
}

/*
 함수에서 발생한 오류 던지기
 
 자판기 동작 도중 발생한 오류 던지기
 오류 발생의 여지가 있는 메서드는 throws를 사용하여
 오류를 내포하는 함수임을 표시합니다
 */

class VendingMachine {
    let itemPrice: Int = 100
    var itemCount: Int = 5
    var deposited: Int = 0
    
    // 돈 받기 메서드
    func receiveMoney(_ money: Int) throws {
        // 입력한 돈이 0이하면 오류를 던집니다
        guard money > 0 else {
            throw VendingMachineError.invalidInput
        }
        
        // 오류가 없으면 정상처리를 합니다
        self.deposited += money
        print("\(money)원 받음")
    }
    
    // 물건 팔기 메서드
    func vend(numberOfItems numberOfItemsToVend: Int) throws -> String {
        // 원하는 아이템의 수량이 잘못 입력되었으면 오류를 던집니다
        guard numberOfItemsToVend > 0 else {
            throw VendingMachineError.invalidInput
        }
        
        // 구매하려는 수량보다 미리 넣어둔 돈이 적으면 오류를 던집니다
        guard numberOfItemsToVend * itemPrice <= deposited else {
            let moneyNeeded: Int
            moneyNeeded = numberOfItemsToVend * itemPrice - deposited
            
            throw VendingMachineError.insufficientFunds(moneyNeeded: moneyNeeded)
        }
        
        // 구매하려는 수량보다 요구하는 수량이 많으면 오류를 던집니다
        guard itemCount >= numberOfItemsToVend else {
            throw VendingMachineError.outOfStock
        }
        
        // 오류가 없으면 정상처리를 합니다
        let totalPrice = numberOfItemsToVend * itemPrice
        
        self.deposited -= deposited
        self.itemCount -= numberOfItemsToVend
        
        return "\(numberOfItemsToVend)개 공급함"
    }
}

// 자판기 인스턴스
let machine: VendingMachine = VendingMachine()


// 판매 결과를 전달 받을 변수
var result: String?

/*
 오류 처리
 
 오류발생의 여지가 있는 throws 함수(메서드)는
 try 를 사용하여 호츌해야 합니다
 try, try? try!
 */

/*
 do-catch
 오류발생의 여지가 있는 throws 함수(메서드)는
 do-catch 구문을 활용하여
 오류발생에 대비합니다
 */

do {
    try machine.receiveMoney(0)
} catch VendingMachineError.invalidInput {
    print("입력이 잘못되었습니다")
} catch VendingMachineError.insufficientFunds(let moneyNeeded) {
    print("\(moneyNeeded)원이 부족합니다")
} catch VendingMachineError.outOfStock {
    print("수량이 부족합니다")
} // 입력이 잘못되었습니다

do {
    try machine.receiveMoney(300)
} catch /* (let error) */ {
    switch error {
    case VendingMachineError.invalidInput:
        print("입력이 잘못되었습니다")
    case VendingMachineError.insufficientFunds(let moneyNeeded):
        print("\(moneyNeeded)원이 부족합니다")
    case VendingMachineError.outOfStock:
        print("수량이 부족합니다")
    default:
        print("알 수 없는 오류 \(error)")
    }
} // 300원 받음

do {
    //    result = try machine.vend(numberOfItems: 4)
} catch {
    //    print(error)
} // insufficientFunds(100)

do {
    //    result = try machine.vend(numberOfItems: 4)
}

/*
 try?와 try!
 
 try?
 별도의 오류처리 결과를 통보받지 않고
 오류가 발생했으면 결과값을 nil로 돌려받을 수 있습니다
 정상동작 후에는 옵셔널 타입으로 정상 반환값을 돌려받습니다
 */

machine.itemCount = 4
result = try? machine.vend(numberOfItems: 2)
result // 2개 공급함

result = try? machine.vend(numberOfItems: 2)
result // nil

/*
 try!
 오류가 발생하지 않을 것이라는 강력한 확신을 가질 때
 try!를 사용하면 정상동작 후에 바로 결과값을 돌려받습니다
 오류가 발생하면 런타임 오류가 발생하여
 애플리케이션 동작이 중지됩니다
 */

//result = try! machine.vend(numberOfItems: 1)
