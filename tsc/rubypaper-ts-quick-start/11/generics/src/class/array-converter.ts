// 11-3-1 제네릭 클래스 선언 - 타입 매개변수를 추가해 선언한 Array 변환기 클래스

class ArrayConvertor<T> {
  elements: Array<T>;
  
  constructor(elms: Array<T>) {
    this.elements = elms;
  }

  array2string(): string {
    let text = '';
    for (let i = 0; i < this.elements.length; i++) {
      if (i > 0) {
        text += ' ';
      }
      text += this.elements[i].toString();
    }
    return text;
  }

  getValue(elms: Array<T>, index: number): T {
    return elms[index];
  }
}

let arr = [1, 2];
// var arr = [1, 2, 'hello'];
let numConvertor = new ArrayConvertor<number>(arr);
console.log(numConvertor.array2string()); // 1 2
console.log(numConvertor.getValue(arr, 0)); // 1

let arr2 = new Array<string>();
arr2.push('a');
arr2.push('b');
// arr2.push(1234);
let stringConvertor = new ArrayConvertor<string>(arr2);
console.log(stringConvertor.array2string()); // a b
console.log(stringConvertor.getValue(arr2, 0)); // a
