// Enum declaration
enum LanguagesKnown { English, Hindi, Tamil }

// Interface declaration
interface StudentInfo {
  Name: string,
  Age: Number,
  Phone: Number,
  Language: string
}

let student: StudentInfo = {
  Name: 'Karthik',
  Age: 30,
  Phone: 2342342,
  Language: LanguagesKnown[LanguagesKnown.Tamil]
}

let studentsList: StudentInfo[] = [
  {Name: 'Prashanth', Age: 26, Phone: 23423423, Language: LanguagesKnown[LanguagesKnown.English]},
  {Name: 'Shree', Age: 27, Phone: 2454545, Language: LanguagesKnown[LanguagesKnown.Hindi]}
]

studentsList.push(student)

// for (var index = 0; index < studentsList.length; index++) {
//   var element = studentsList[index];
//   console.log('Age:' + element.Age + ' with Name ' + element.Name + ' has Phone:' + element.Phone + ' knows language:' + element.Language)
// }

function GetStudentsList(students: StudentInfo[]) {
  students.forEach(element => {
    console.log('Age:' + element.Age + ' with Name ' + element.Name + ' has Phone:' + element.Phone + ' knows language:' + element.Language)
  });
}

GetStudentsList(studentsList)

// Rest Parameters
function GetNumbers(...nums: number[]) {
  nums.forEach(element => {
    console.log('Number: ' + element);
  });
}

GetNumbers(1,2,3,4,5,6)

// Default Parameters
function GetInfo(info: string = 'Happy') {
  console.log(info);
}

GetInfo('Very Happy');


///////// Functions advanced

// Anonymous function
let StudentName = function(lName: string, fName: string) {
  return fName + '...' + lName;
}

console.log(StudentName('KK', 'Karthik'))

// Arrow Function
let StudentFullName = (lName: string, fName: string) => { return fName + '...' + lName; }

console.log(StudentFullName('KK', 'Prashanth'))


///////// Classes

class Students {
  // private lName: string;
  // private fName: string;

  // constructor(lName, fName) {
  constructor(private lName, private fName) {
    this.lName = lName;
    this.fName = fName;
  }
  

  GetFullName(): string
  {
    return this.lName + ' ' + this.fName;
  }
}

let s = new Students('KK', 'Karthik');
console.log(s.GetFullName());

//////// Generics

let studentsListG: Array<StudentInfo> = [
  {Name: 'Prashanth', Age: 26, Phone: 23423423, Language: LanguagesKnown[LanguagesKnown.English]},
  {Name: 'Shree', Age: 27, Phone: 2454545, Language: LanguagesKnown[LanguagesKnown.Hindi]}
]

function GetStudentsListGenerics(students: Array<StudentInfo>) {
  students.forEach(element => {
    console.log('Age:' + element.Age + ' with Name ' + element.Name + ' has Phone:' + element.Phone + ' knows language:' + element.Language)   
  });
}

GetStudentsListGenerics(studentsListG);
