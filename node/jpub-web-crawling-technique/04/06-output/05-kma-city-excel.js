// KMA 도시 정보를 엑셀로 저장 for Node.js

var urlType = 'http://www.kma.go.kr/DFSROOT/POINT/DATA/top.json.txt';

// 모듈 로드
var fs = require('fs');
var officeGen = require('officegen');
var xlsx = officeGen('xlsx');
var request = require('request');

// 도시 정보 요청
request(urlType, function(err, res, body) {
  if (err) throw err;
  var list = JSON.parse(body);
  exportToExcel(list);
  console.log(list);
});

function exportToExcel(list) {
  // 신규 시트 작성
  var sheet = xlsx.makeNewSheet();
  sheet.name = '도시 정보';

  // 직접 데이터 작성
  sheet.data[0] = [
    '도시명', '코드'
  ];

  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    sheet.data[i + 1] = [r.code, r.value];
  }

  // 파일 쓰기
  var strm = fs.createWriteStream('kma_city_codes.xlsx');
  xlsx.generate(strm);
  console.log('ok');
}
