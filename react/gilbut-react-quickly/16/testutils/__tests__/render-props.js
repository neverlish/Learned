describe('HelloWorld', () => {
  const TestUtils = require('react-dom/test-utils')
  const React = require('react')

  it('속성(props)을 갖는다', (done) => {
    class HelloWorld extends React.Component {
      render() {
        return <div>{this.props.children}</div>
      }
    }
    let hello = TestUtils.renderIntoDocument(<HelloWorld>Hello Node!</HelloWorld>)
    expect(hello.props).toBeDefined()
    console.log('my hello props: ', hello.props)

    done()
  })
})
