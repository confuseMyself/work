import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types'
import qs from 'qs'

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: window.location.hash,
      a: 0
    }
  }
  // 定义context type
  static childContextTypes = {
    hash: PropTypes.string,
    a: PropTypes.number
  }
  // 初始化context 的值
  // 在组件调用render函数时，会重新计算getChildContext()函数，重新传context给子孙组件；
  getChildContext() {
    return {
      hash: this.getHash(),
      a: this.getA()
    }
  }
  getHash() {
    let url = window.location.hash.replace('#', '')
    return url
  }
  getA(){
    return Math.random()
  }
  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
  componentDidMount() {
    window.onhashchange = () => {
      this.setState({
        // hash: this.getHash(),
        a: 2
      })
    }
  }

}

class Route extends React.Component {
  // 声明使用的context 
  static contextTypes = {
    hash: PropTypes.string,
    a: PropTypes.number
  }
  // context 会与 shouldComponentUpdate冲突，当子孙组件shouldComponentUpdate 阻止渲染后，
  shouldComponentUpdate(){
    return false
  }
  render() {
    const {
      component,
      path
    } = this.props
    const {
      hash,
      a
    } = this.context
    console.log(a, hash)
    return (
      <>
        {hash === path && React.createElement(component, null, null)}
      </>
    );
  }


  componentDidMount() {

  }

}

const AA = () => <div>aa</div>
const BB = () => <div>bb</div>

function HashHistoryDemo() {
  return (
    <div className="App">
      <Router >
        <header className="App-header">
          <div>header</div>
          <Route path='/aa' component={AA} />
          <Route path='/bb' component={BB} />
        </header>
      </Router>

    </div>
  );
}

export default HashHistoryDemo;
