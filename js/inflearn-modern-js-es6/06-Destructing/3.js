// 06 Destructing - 3 Destructing 활용 JSON 파싱

var news = [
  {
    "title": "sbs",
    "imgurl": "http://static.naver.net/newsstand/up/2013/0813/nsd11419129.gif",
    "newslist": [
      "[가보니] 가상 경주고 즐기고, 내 손으로 자동차도 만들고",
      "리캡차'가 사라진다",
      "갤럭시 S8' 출시? '갤노트' 처리 계획부터 밝혀야",
      "블로코-삼성SDS, 블록체인 사업 '맞손",
      "[블록체인 톺아보기] 퍼블릭 블록체인의 한계와 프라이빗 블록체인"
    ]
  },
  {
    "title": "mbc",
    "imgurl": "http://static.naver.net/newsstand/up/2013/0813/nsd114044142.gif",
    "newslist": [
      "Lorem ipsum dolor sit amet, nihil latine ea mea. ",
      "Consul equidem inermis et mel. Ne eam liber graece, ",
      "ea malorum percipit splendide mea. ",
      "At has noluisse probatus referrentur, elit ullamcorper in quo, justo vitae alienum est no. ",
      "Ut nec minim essent delectus."
    ]
  }
];

/*
let [,mbc] = news;
let {title, imgurl} = mbc;
console.log(title, imgurl);
*/

let [, {title, imgurl}] = news;
console.log(imgurl)
