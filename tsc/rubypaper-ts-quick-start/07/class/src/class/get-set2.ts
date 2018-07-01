// 07-3-4 클래스에서 getter와 setter - 클래스에 get/set 키워드로 접근자와 설정자를 선언하고 사용하기

class Student2 {
  private studentName: string;
  private studentBirthYear: number;

  get name(): string {
    return this.studentName;
  }

  set name(name: string) {
    if (name.indexOf('happy') !== 0) {
      this.studentName = name;
    }
  }

  get birthYear(): number {
    return this.studentBirthYear;
  }

  set birthYear(year: number) {
    if (year <= 2000) {
      this.studentBirthYear = year;
    }
  }
}

let student2 = new Student2();
student2.birthYear = 2001;
console.log('1번 : ' + student2.birthYear); // 1번 : undefined

student2.birthYear = 2000;
console.log('2번 : ' + student2.birthYear); // 2번 : 2000

student2.name = 'happy';
console.log('3번 : ' + student2.name); // 3번 : undefined

student2.name = 'lucky';
console.log('4번 : ' + student2.name); // 4번 : lucky
