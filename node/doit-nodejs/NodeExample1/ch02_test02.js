console.log('argv 속성의 파라미터 수 : ' + process.argv.length);
console.dir(process.argv);``

if (process.argv.length > 2) {
  console.log('세 번째 파라미터의 값 : %s', process.argv[2]);
}

process.argv.forEach(function(item, index) {
  console.log(index + ' : ' + item);
})


// node ch02_test02.js --port 7001
