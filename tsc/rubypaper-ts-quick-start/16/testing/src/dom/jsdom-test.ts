// 16-3-3 DOM 테스트 - jsdom 소개와 사용법 - jsdom 모듈에 대한 기본 테스트

let jsdom = require('jsdom').jsdom;
import fs = require('fs');
let html = fs.readFileSync('./index.html', 'utf-8');

let doc = jsdom(html);
let window = doc.defaultView;
console.log(window.document.documentElement.outerHTML);
console.log(window.innerWidth);
console.log(typeof window.document.getElementsByClassName);
