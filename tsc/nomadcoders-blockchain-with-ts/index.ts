const name = "Nicloas", 
      age = 24, 
      gender = "male";

const sayHi = (name, age, gender?) => {
  console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
}

sayHi(name, age);

export {};
