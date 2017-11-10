// 07 Overload a Function with TypeScript’s Overload Signatures

/**
 * Reverses the given string.
 * @param stringOrArray The string to reverse.
 */

function reverse(string: string): string;

/**
 * Reverses the given  array.
 * @param stringOrArray The array to reverse.
 */

function reverse<T>(array: T[]): T[];

function reverse(stringOrArray: string | any[]) {
  return typeof stringOrArray === 'string'
  ? stringOrArray.split('').reverse().join('')
  : stringOrArray.slice().reverse();
}

const reversedString = reverse('TypeScript'); // tpircSepyT 
const reversedArray = reverse([4, 8, 15, 16, 23]); // [ 23, 16, 15, 8, 4 ]

console.log(reversedString, reversedArray)
