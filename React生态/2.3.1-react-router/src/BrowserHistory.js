import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types'
import qs from 'qs';// qs 用于对url的序列化和反序列化 qs.parse()将URL解析成对象的形式；qs.stringify()将对象 序列化成URL的形式，以&进行拼接
import {
  Observable,
  pipe,
  of,
  from,
  fromEvent,
  concat,
  timer, combineLatest, interval 
} from 'rxjs';
import {
  concatAll,
  scan,
  map,
  mapTo ,merge,switchMap 
} from "rxjs/operators"
// 立即发出值， 然后每5秒发出值
const source = timer(0, 5000);
// 当 source 发出值时切换到新的内部 observable，发出新的内部 observable 所发出的值
const example = source.pipe(switchMap(() => interval(500)));
// 输出: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
const subscribe = example.subscribe(val => console.log(val));
































class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.pathname
    }
    this.history = window.history
    this.history.route = (name) => {
      this.setState({
        url: `/${name}`
      })
      window.history.pushState(null, null, name)
    }
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }

  static childContextTypes = {
    url: PropTypes.string,
    history: PropTypes.object
  }

  getChildContext() {
    return {
      url: this.state.url,
      history: this.history
    }
  }


  componentDidMount() {
    // window.onhashchange = () => {
    //   this.setState({
    //     hash: this.getHash()
    //   })
    // }

    window.onpopstate = (a) => {
      console.log(a)
    }
  }

}

class Route extends React.Component {

  static contextTypes = {
    url: PropTypes.string,
    history: PropTypes.object
  }

  render() {
    const {
      component,
      path
    } = this.props
    const {
      url
    } = this.context

    let instance = React.createElement('div', component)
    return (
      <>
        {url === path && React.createElement(component, null, null)}
      </>
    );
  }


  componentDidMount() {

  }

}

const AA = () => <div>aa</div>
const BB = () => <div>bb</div>

function App() {
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

export default App;
