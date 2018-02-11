// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 6 Destructing

// Destructing 활용 예
(() => {
  var myArray = [1,2,3,4,5];
  var [a, b, , c, d] = myArray;

  console.log('Array shorthand: ' + a + ' , ' + b + ' , ' + c + ' , ' + d);

  [a, b] = [b, a];
  console.log('Swap: ' + a + ' , ' + b);

  var myObject = {
    name: 'Unikys',
    gender: 'Male',
    job: 'Progammer'
  };

  var {name, gender, job} = myObject;
  console.log('Object shorthand: ' + name + ' , ' + gender + ' , ' + job);

  var vehicles = {
    fourWheels: {
      cars: [
        'SUV',
        'Sedan'
      ],
      trucks: [
        'Pullover',
        'Wagen'
      ]
    },
    twoWheels: [
      'bicycle',
      'motorcycle'
    ]
  };

  var {fourWheels, twoWheels, fourWheels: {cars, trucks}} = vehicles;
  console.log('Deep object: ' + fourWheels + ' , ' + twoWheels + ' , ' + cars + ' , ' + trucks);
})();

// Destructing 기본값 설정 예
(() => {
  var myArray = [1, 2];
  var [a = 10, b = 9, c = 8, d = 7] = myArray;
  console.log(a + ' , ' + b + ' , ' + c + ' , ' + d); // 1 , 2 , 8 , 7
})();

// 인자로 Destructing 응용 예
(() => {
  function destructArray([first, second]) {
    console.log('Inside destructArray function: ' + first + ' , ' + second);
    return [first + second, first - second, first * second, first / second];
  }

  function destructObject({name, gender}) {
    console.log('Inside destructObjet function: ' + name + ' , ' + gender);
    return {
      greetings: 'Hello, ' + name,
      sayHello() {
        console.log('sayHello function: Hello, ' + name);
      }
    };
  }
  var [sum, sub, mul, div] = destructArray([1, 2]);
  console.log(`Return value of destructArray: ${sum}, ${sub}, ${mul}, ${div}`);
  var {greetings, sayHello} = destructObject({name: 'Unikys', gender: 'Male'});
  sayHello();
})();
