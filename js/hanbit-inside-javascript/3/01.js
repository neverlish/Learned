// 자바스크립트 기본 타입

// 숫자 타입
var intNum = 10;
var floatNum = 0.1;

// 문자열 타입
var singleQuoteStr = 'single quote string';
var doubleQuoteStr = "double quote string";
var singleChar = 'a';

// 불린 타입
var boolVar = true;

// undefined 타입
var emptyVar;

// null 타입
var nullVar = null;

console.log(
	typeof intNum, // number
	typeof floatNum, // number
	typeof singleQuoteStr, // string
	typeof doubleQuoteStr, // string
	typeof boolVar, // boolean
	typeof nullVar, // object (null이 아님)
	typeof emptyVar // undefined
);