import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ''
class Animate extends Component {
  render () {
    return (
      <div >
        {this.props.children}
      </div>
    )
  }

  componentDidMount () {
    const element = ReactDOM.findDOMNode(this)
    element.classList.add('animated', 'bounceInLeft')
  }
}

class App extends Component {
  render () {
    return (
      <div>
        <Animate in='bounceInLeft' out='bounceOutDown'>
          <p>hello world</p>
        </Animate>
      </div>
    )
  }
}

export default App
