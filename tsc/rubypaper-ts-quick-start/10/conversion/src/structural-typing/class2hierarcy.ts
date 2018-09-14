// 10-2-3 구조 타이핑 - 구조가 같은 클래스 간의 구조 타이핑(상속 관계 고려) - 상속 관계에 있는 클래스와 클래스 간의 타입 호환의 예

class Person {
  public name: string;
}

class Member extends Person {
  public grade: number;
}

class Admin extends Member { }

class MemberCard {
  public name: string;
  public grade: number;
}

let admin: Admin = new Admin();
admin = new MemberCard();
