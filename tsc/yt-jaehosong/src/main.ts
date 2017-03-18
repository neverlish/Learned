enum Days {Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday};

console.log(Days.Sunday);
// 0
console.log(Days.Monday);
// 1

enum Days {Sunday = 1, Monday=3, Tuesday=5, Wednesday, Thursday, Friday, Saturday};

console.log(Days.Sunday);
// 1
console.log(Days.Tuesday);
// 5
console.log(Days.Wednesday)
// 6
console.log(Days[5])
// Tuesday
