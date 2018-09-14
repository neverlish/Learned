// 10-2-3 구조 타이핑 - 구조가 같은 클래스와 인터페이스 간의 구조 타이핑

interface Person {
  name: string;
}

class Employee {
  name: string;
}

let person: Person;
person = new Employee();
