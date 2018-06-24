// 06-2-2 나머지 매개변수 - 일반 매개변수와 나머지 매개변수를 동시에 선언

function colors(a: string, ...rest: string[]) {
  return a + " " + rest.join(" ");
}

let color1 = colors("red");
let color2 = colors("red", "orange");
let color3 = colors("red", "orange", "yellow");

console.log(`color1=${color1}
color2=${color2}
color3=${color3}`);

/*
color1=red
color2=red orange
color3=red orange yellow
*/
