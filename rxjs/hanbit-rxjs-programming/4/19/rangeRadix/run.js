const rangeRadix = require('./rangeRadix');

rangeRadix(1, 16, 16).subscribe(value => console.log(value));
/*
1
2
3
4
5
6
7
8
9
a
b
c
d
e
f
10
*/
