/*
파일의 내용을 한 줄 씩 읽어 들여 화면에 출력하는 기능을 만들어보세요.
1. 하나의 파일을 만들고 각 줄에는 공백으로 구분된 이름, 나이, 전화번호가 들어가도록 구성합니다.
2. 파일의 내용을 한 줄 씩 읽어 들이면서 각 정보를 공백으로 구분합니다.
3. 구분된 정보 중에서 이름만 화면에 출력합니다.
*/

var fs = require('fs');

fs.readFileSync('./ch04-quiz01.md', 'utf8')
  .toString().split('\n')
  .forEach(function(line) { 
    if (line) {
      console.log(line.split(' ')[0])
    }
  });
