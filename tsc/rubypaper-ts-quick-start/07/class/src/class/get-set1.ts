// 07-3-4 클래스에서 getter와 setter - 접근자를 통해 객체의 속성에 접근

class Student {
  name: string;
  birthYear: number;
}

let student = new Student();

// 속성값 설정
student.name = 'happy';
student.birthYear = 2017;

// 속성값 읽기
console.log(student.name); // happy
console.log(student.birthYear); // 2017
