import React from 'react';

class App extends React.Component {
  render() {
    return (
      <Parent>
        <div className='childA'></div>
        <div className='childB'></div>
      </Parent>
    )
  }
}

class Parent extends React.Component {
  render() {
    // let items = this.props.children.map(child => child) // children 이 하나 일때는 에러가 뜸
    // let items = React.Children.map(this.props.children, child=>child)
    // let items = React.Children.toArray(this.props.children)
    let items = React.Children
      .forEach(this.props.children, child => console.log(child.props.className))
    // let items = React.Children.only(this.props.children) // children 이 2개일 때 에러가 뜸
    console.log(items)
    return null
  }
}

export default App
