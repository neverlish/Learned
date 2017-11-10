// 01 Restrict null and undefined via Non-Nullable-Types in TypeScript

function trimAndLower(text: string) {
  return text.trim().toLowerCase();
}

// command 'tsc'
console.log(trimAndLower(' LearnTypescript.io '));

// console.log(trimAndLower(null)); // strictNullChecks
// Argument of type 'null' is not assignable to parameter of type 'string'.

// node dist/01.js
// -> TypeError: Cannot read property 'trim' of null

//////

let text: string;
text = 'Some string';
// text = null;
// Type 'null' is not assignable to type 'string'.
// text = undefined;

let bool: boolean;
bool = true;
bool = false;
// bool = null;
// bool = undefined;

////////

let text2: string | null | undefined;
text2 = 'Some string';
text2 = null;
text2 = undefined;

let num2: number | null;
num2 = 42;
num2 = null; 


function trimAndLower2(text: string | null | undefined) {
  if (typeof text === 'string') {
    return text.trim().toLowerCase(); 
  }
  return text;
}

console.log(trimAndLower2(' LearnTypescript.io '));
console.log(trimAndLower2(null));
console.log(trimAndLower2(undefined));

//////////////

const container = document.getElementById('app-container');
// container.remove() => 불가능
if (container) {
  container.remove();
}

//////////////

const container2 = document.getElementById('app-container')!;
container2.remove();
