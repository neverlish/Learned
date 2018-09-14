// 16-3-3 DOM 테스트 - 입력 상자의 문자열 길이에 대한 DOM 테스트 - index.html 템플릿에 대한 입력 상자 테스트 코드

import * as mocha from 'mocha';

let expect = require('chai').expect,
    jsdom = require('jsdom').jsdom;

import fs = require('fs');

describe('입력 테스트', function() {
  let $;

  before(function() {
    let html = fs.readFileSync('src/dom/index.html', 'utf-8');
    let document = jsdom(html);
    let window = document.defaultView;
    $ = require('jquery')(window);
  });

  it('ID 입력 최소길이와 최대길이에 대한 테스트', function() {
    expect($('input[name=userID]').attr('minlength')).eql('3');
    expect($('input[name=userID]').attr('maxlength')).eql('5');
  });

  it('비밀번호의 최소길이와 최대길이에 대한 테스트', function() {
    expect($('input[name=userPW]').attr('minlength')).eql('3');
    expect($('input[name=userPW]').attr('maxlength')).eql('5');
  });
});
