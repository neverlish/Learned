class Content extends React.Component {
  constructor(props) {
    super(props)
    this.launchClock()
    this.state = {
      counter: 0,
      currentTime: (new Date()).toLocaleString('en')
    }
  }

  launchClock() {
    setInterval(() => {
      this.setState({
        counter: ++this.state.counter,
        currentTime: (new Date()).toLocaleString('en')
      })
    }, 1000)
  }

  render() {
    if (this.state.counter > 2) return
    return <Logger time={this.state.currentTime}></Logger>
  }
}
