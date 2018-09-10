module.exports = {
  'default e2e tests': (browser) => {
    // 브라우저를 열고 #app이 존재하는지 확인
    browser.url('http://localhost:8080')
      .waitForElementVisible('#app', 5000)
    // toggle-volumne 아이콘이 보이지 않는지 확인
    browser.expect.element('.toggle-volume')
      .to.not.be.visible
    // 일시 정지 버튼이 비활성화 상태인지 확인
    browser.expect.element('[title=pause]')
      .to.have.attribute('disabled')
    // 정지 버튼이 비활성화 상태인지 확인
    browser.expect.element('[title=stop]')
      .to.have.attribute('disabled')
    // 시작 버튼이 비활성화 상태가 아닌지 확인
    browser.expect.element('[title=start]')
      .to.not.have.attribute('disabled')
    // 시작 버튼을 클릭하고 toggle-volume 버튼이 보이는지 확인
    browser.click('[title=start]')
      .waitForElementVisible('.toggle-volume', 5000)
    // 일시 정지 버튼이 비활성화 상태가 아닌지 확인
    browser.expect.element('[title=pause]')
      .to.not.have.attribute('disabled')
    // 정지 버튼이 비활성화 상태가 아닌지 확인
    browser.expect.element('[title=stop]')
      .to.not.have.attribute('disabled')
    // 시작 버튼이 비활성화 상태인지 확인
    browser.expect.element('[title=start]')
      .to.have.attribute('disabled')
    browser.end()
  },
  'wait for kitten test': (browser) => {
    browser.url('http://localhost:8080')
      .waitForElementVisible('#app', 5000)
    // 초기에 kitten 엘리먼트는 보이지 않는다
    browser.expect.element('.well.kittens')
      .to.not.be.visible
    // 시작 버튼을 클릭하고 kitten 엘리먼트가 보일 때까지 7초간 기다린다
    browser.click('[title=start')
      .waitForElementVisible('.well.kittens', 7000)
    // 이미지의 src 속성이 thecatapi 문자열을 포함하는지 확인한다
    browser.expect.element('.well.kittens img')
      .to.have.attribute('src')
      .which.matches(/thecatapi/)
    browser.end()
  }
}
