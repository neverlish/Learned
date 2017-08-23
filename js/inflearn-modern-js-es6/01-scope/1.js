// 01 scope - 1 let

var name = 'global var';

function home() {
  var homevar = 'homevar';
  for (var i = 0; i < 100; i++) {
    
  }
  console.log(i)
}
home(); // 100


function home2() {
  var homevar = 'homevar';
  for (let i = 0; i < 100; i++) {
    
  }
  // console.log(i) // ReferenceError: i is not defined

  if (true) {
    let myif = 'myif';
  }
  // console.log(myif) // ReferenceError: myif is not defined
}
home2(); 
