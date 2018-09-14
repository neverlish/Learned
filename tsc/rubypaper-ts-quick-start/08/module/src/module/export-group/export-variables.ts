// 08-3-3 여러 모듈을 함께 export 하기 - 여러 변수를 함께 export하기

let ver = '1.0';
let author: string = 'happy';
let extensions = ['jpg', 'bmp', 'png'];
let display = () => 'hello world';
export { ver, author, extensions, display };
