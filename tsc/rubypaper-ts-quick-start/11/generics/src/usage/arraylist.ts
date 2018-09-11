// 11-4-4 제네릭 기반의 자료구조 만들기 - ArrayList의 구현

class ArrayList<T> {
  private arrayList: (T | number)[] = [];

  add(indexOrValue: T  | number, value?: T) {
    if (value !== undefined) {
      // 타입 가드
      if (typeof indexOrValue === 'number') {
        this.arrayList.splice(indexOrValue, 0, value);
      }
    } else {
      this.arrayList.push(indexOrValue);
    }
  }

  remove(index: number) {
    this.arrayList.splice(index, 1);
  }

  addAll(elements: T[]) {
    this.arrayList = [...this.arrayList, ...elements];
  }

  get(index: number): T | number {
    return this.arrayList[index];
  }

  clear() {
    this.arrayList = [];
  }

  isEmpty(): boolean {
    return this.arrayList.length === 0 ? true : false;
  }

  set(index: number, value: T) {
    this.arrayList[index] = value;
  }

  toArray(): (T | number)[] {
    return this.arrayList;
  }

  size(): number {
    return this.arrayList.length;
  }
}

let aList = new ArrayList<string>();
aList.add('a');
aList.add('b');
aList.add('c');
console.log('1번 add:', aList.toArray()); // 1번 add: [ 'a', 'b', 'c' ]
}
aList.add(1, 'high');
console.log('2번 index로 add:', aList.toArray()); // 2번 index로 add: [ 'a', 'high', 'b', 'c' ]

aList.remove(1);
console.log('3번 remove(1):', aList.toArray()); // 3번 remove(1): [ 'a', 'b', 'c' ]

aList.addAll(['d', 'e']);
console.log('4번 addAll:', aList.toArray()); // 4번 addAll: [ 'a', 'b', 'c', 'd', 'e' ]

console.log('5번 get(2):', aList.get(2)); // 5번 get(2): c

console.log('6번 size():', aList.size()); // 6번 size(): 5

aList.clear();
console.log('7번 size():', aList.size()); // 7번 size(): 0

if (aList.isEmpty()) {
  console.log('8번 empty!'); // 8번 empty!
}
