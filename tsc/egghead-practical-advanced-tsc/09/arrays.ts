const numbers = [1, 2, 3, 4];

let i = 0;
do {
  console.log(numbers[i]);
  i++;
} while (i < numbers.length);
/*
1
2
3
4
*/

for (let num of numbers) {
  console.log(num);
}
/*
1
2
3
4
*/
