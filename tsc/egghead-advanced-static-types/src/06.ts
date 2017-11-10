// 06 Use TypeScript’s never Type for Exhaustiveness Checking

const sing = function() {
  while (true) {
    console.log("Never gonna give you up, never gonna let you down");
    console.log("Never gonna run around and desert you");
    console.log("Never gonna make you cry, never gonna say goodbye");
    console.log("Never gonna tell a lie and hurt you");
  }

  // ...
}; // type: () => never;

const result = sing();

function sing2() {
  while (true) {
    console.log("Never gonna give you up, never gonna let you down");
    console.log("Never gonna run around and desert you");
    console.log("Never gonna make you cry, never gonna say goodbye");
    console.log("Never gonna tell a lie and hurt you");
  }

  // ...
}; // type: void;

const greet = function() {
  alert('Hi!');
}; // type: () => void;

const fail = function() {
  throw Error();
}; // type: () => never;

function sing3(): never {
  while (true) {
    console.log("Never gonna give you up, never gonna let you down");
    console.log("Never gonna run around and desert you");
    console.log("Never gonna make you cry, never gonna say goodbye");
    console.log("Never gonna tell a lie and hurt you");
    // break; // A function returning 'never' cannot have a reachable end point.
  } 
}

function trimAndLower4(text: string | null) {
  if (typeof text === 'string') {
    return text.trim().toLowerCase();
  }

  if (text === null) {
    return null;
  }

  return text;
}

enum ShirtSize {
  S,
  M,
  L,
  XL
}

function assertNever(value: never): never {
  throw Error(`Unexpected value '${value}'`);
}

function prettyPrint(size: ShirtSize) {
  switch(size) {
    case ShirtSize.S: return 'small';
    case ShirtSize.M: return 'medium';
    case ShirtSize.L: return 'large';
    case ShirtSize.XL: return 'extra large'; // 이 줄이 없으면: Argument of type 'ShirtSize.XL' is not assignable to parameter of type 'never'.
    default: return assertNever(size);
  }
}
