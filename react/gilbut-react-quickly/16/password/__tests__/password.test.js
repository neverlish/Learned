describe('비밀번호', function() {
  it('Generate(생성) 버튼을 누르면 변경된다', (done) => {
    const TestUtils = require('react-dom/test-utils')
    const React = require('react')
    const ReactDOM = require('react-dom')
    const Password = require('../jsx/password.jsx')
    const fD = ReactDOM.findDOMNode

    let password = TestUtils.renderIntoDocument(<Password
      upperCase={true}
      lowerCase={true}
      special={true}
      number={true}
      over6={true}
      />
    )

    let rules = TestUtils.scryRenderedDOMComponentsWithTag(password, 'li')
    expect(rules.length).toBe(5)
    expect(rules.length).toEqual(5)
    expect(fD(rules[0]).textContent).toEqual('Must have at least one upper-case character')
    expect(fD(rules[0]).textContent).toBe('Must have at least one upper-case character')
    let generateButton = TestUtils.findRenderedDOMComponentWithClass(password, 'generate-btn')
    expect(fD(rules[1]).firstChild.nodeName.toLowerCase()).toBe('#text')
    TestUtils.Simulate.click(fD(generateButton))
    expect(fD(rules[1]).firstChild.nodeName.toLowerCase()).toBe('strike')

    done()
  })
})
