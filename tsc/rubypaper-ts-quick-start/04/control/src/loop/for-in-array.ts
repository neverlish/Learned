// 04-2-1 for 문과 이터러블 객체 - ES5의 for in 문 - for in 문을 이용해 배열을 순회

let islands = ["Jejudo", "Geojedo", "Jindo", "Ganghwado", "Namhaedo"];

for (let index in islands) {
  console.log(index, islands[index]);
}

/*
0 Jejudo
1 Geojedo
2 Jindo
3 Ganghwado
4 Namhaedo
*/
