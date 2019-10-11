import {Router, Route, Link } from "react-router";
import React from 'react'
import {history} from './config'
import Header from './views/header'
import Sider from './views/sider'
import './index.css'
function App() {
  return (
    <Router history={history}>
      <div className='app-content'>
        <div className='app-header'>
          <Header/>
        </div>
        <div className='app-body'>
          <div className='app-body__sider'>
            <Sider/>
          </div>
          <div className='app-body__content'>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
          </div>
        </div>
      </div>

    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
function Topics() {
  return <h2>Topics</h2>;
}
function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}
export default App
