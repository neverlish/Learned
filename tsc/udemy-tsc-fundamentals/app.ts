enum LanguagesKnown { English, Hindi, Tamil }

let student = {
  Name: 'Karthik',
  Age: 30,
  Phone: 2342342,
  Language: LanguagesKnown[LanguagesKnown.Tamil]
}

let studentsList = [
  {Name: 'Prashanth', Age: 26, Phone: 23423423, Language: LanguagesKnown[LanguagesKnown.English]},
  {Name: 'Shree', Age: 27, Phone: 2454545, Language: LanguagesKnown[LanguagesKnown.Hindi]}
]

studentsList.push(student)

for (var index = 0; index < studentsList.length; index++) {
  var element = studentsList[index];
  console.log('Age:' + element.Age + ' with Name ' + element.Name + ' has Phone:' + element.Phone + ' knows language:' + element.Language)
}
