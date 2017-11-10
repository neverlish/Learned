// 02 Understand TypeScript’s Control Flow Based Type Analysis

function trimAndLower3(text: string | null | undefined) {
  // if (!text) {
  //   return text;  
  // }
  // return text.trim().toLowerCase(); 
  return typeof text === 'string'
    ? text.trim().toLowerCase()
    : text;
}

////////////

let foo: number;
// console.log(foo); // Variable 'foo' is used before being assigned.

let foo2: number | undefined;
console.log(foo2);

foo2 = 42;
foo2.toLocaleString();

foo2 = undefined;
// foo2.toLocaleString(); // Object is possibly 'undefined'.
