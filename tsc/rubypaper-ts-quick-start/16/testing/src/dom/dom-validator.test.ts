// 16-3-3 DOM 테스트 - pattern 속성에 대한 DOM 테스트 - index-pattern.html 파일을 테스트하는 코드(pattern 속성에 대한 테스트)

import * as mocha from 'mocha';

let expect = require('chai').expect,
    jsdom = require('jsdom').jsdom;

import fs = require('fs');

describe('입력 테스트', function() {
  let $;

  before(function() {
    let html = fs.readFileSync('src/dom/index-pattern.html', 'utf-8');
    let document = jsdom(html);
    let window = document.defaultView;
    $ = require('jquery')(window);
  });

  describe('ID의 패턴 검증', function() {
    let pattern, patt;

    before(function() {
      pattern = $('input[name=userID]').attr('pattern');
      patt = new RegExp(pattern);
    });

    it('통과 테스트', function() {
      expect(patt.test('abc')).eql(true);
      expect(patt.test('abcD')).eql(true);
    });

    it('실패 테스트', function() {
      expect(patt.test('ab')).eql(false);
      expect(patt.test('0ab')).eql(false);
      expect(patt.test('abcdef')).eql(false);
    });
  });

  it('비밀번호의 패턴 검증 테스트', function() {
    let pattern = $('input[name=userPW]').attr('pattern');
    let patt = new RegExp(pattern);

    // 통과 테스트
    expect(patt.test('0ab')).eql(true);
    expect(patt.test('0abcd')).eql(true);

    // 실패 테스트
    expect(patt.test('0')).eql(false);
    expect(patt.test('0abcde')).eql(false);
  });
});
