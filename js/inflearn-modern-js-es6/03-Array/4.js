// 03 Array - 4 from 메서드로 진짜 배열 만들기

// ES2015 from method

function addMark() {
  // let newData = [];

  // for(let i = 0; i < arguments.length; i++) {
  //   newData.push(arguments[i] + '!');
  // }

  let newArray = Array.from(arguments)
  // let newData = arguments.map(function(value) { // TypeError: arguments.map is not a function
  let newData = newArray.map(function(value) {
    return value + '!';
  })

  console.log(newData);
}

addMark(1, 2, 3, 4, 5);
