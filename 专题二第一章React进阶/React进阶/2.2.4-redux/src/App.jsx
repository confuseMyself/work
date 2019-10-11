import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Header from './components/Header'
import Home from './views/home'
// import About from './views/about'
import Friend from './views/friend'

class App extends React.Component {
  render() {
    return (
      <div>
        <Friend/>
        {/*<Home/>*/}
      </div>
    )
  }
}

export default App
