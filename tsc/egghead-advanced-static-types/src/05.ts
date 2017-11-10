// 05 Represent Non-Primitive Types with TypeScript’s object Type

type Primitive =
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined;

let obj: object;

// obj = true; // Type 'true' is not assignable to type 'object'.
// obj = 42; // Type '42' is not assignable to type 'object'.
// obj = 'foo'; // Type '"foo"' is not assignable to type 'object'.
// obj = Symbol(); // Cannot find name 'Symbol'.
// obj = null; // Type 'null' is not assignable to type 'object'.
// obj = undefined; // Type 'undefined' is not assignable to type 'object'.

obj = {};
obj = [];
obj = Math.random;

// Object.create(42); // Argument of type '42' is not assignable to parameter of type 'object | null'.

const obj2: Object = {};
obj2.hasOwnProperty('foo');
// obj2.foo = 'bar'; // Property 'foo' does not exist on type 'Object'.

const obj3: { [key: string]: any } = {};
obj3.hasOwnProperty('foo');
obj3.foo = 'bar';
