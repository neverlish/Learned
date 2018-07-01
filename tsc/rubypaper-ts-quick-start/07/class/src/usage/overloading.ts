// 07-3-2 오버로딩을 구현하는 여러 방법 - 오버라디이 메서드를 오버로딩하기 - 오버라이딩된 typeCheck 메서드의 오버로딩

class SingleTypeChecker {
  constructor() { }
  typeCheck(value: string): void {
    console.log(`${typeof value} : ${value}`);
  }
}

class UnionTypeChecker extends SingleTypeChecker {
  constructor() { super(); }

  typeCheck(value: number): void;
  typeCheck(value: string): void;
  typeCheck(value: any): void {
    if (typeof value === 'number') {
      console.log('숫자 : ', value);
    }
    else if (typeof value === 'string') {
      console.log('문자열 : ', value);      
    } else {
      console.log('기타 : ', value);
    }
  }
}

let unionTypeChecker = new UnionTypeChecker();
unionTypeChecker.typeCheck(123); // 숫자 :  123
unionTypeChecker.typeCheck('happy'); // 문자열 :  happy
// unionTypeChecker.typeCheck(true);
