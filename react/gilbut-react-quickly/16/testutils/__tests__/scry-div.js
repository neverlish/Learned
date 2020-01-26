describe('HelloWorld', () => {
  const TestUtils = require('react-dom/test-utils')
  const React = require('react')

  it('div가 있다', (done) => {
    class HelloWorld extends React.Component {
      render() {
        return <div>{this.props.children}</div>
      }
    }
    let hello = TestUtils.renderIntoDocument(<HelloWorld>Hello Node!</HelloWorld>)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(
      hello, 'div'
    ).length).toBe(1)
    console.log('찾은 div의 수: ', TestUtils.scryRenderedDOMComponentsWithTag(hello, 'div').length)
    done()
  })
})
