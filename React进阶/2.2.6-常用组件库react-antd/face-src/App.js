import React,{Component} from 'react'

class App extends Component{
  render () {
    return (
      <Router>
        <div >
          <Header/>
          <div style={{display:'flex'}}>
            <Sider style={{width:'150px'}}/>
            <div style={{flex:1}}>
              <Route path='/hello' component={Hello}/>
              <Route path='/friend' component={Friend}/>
            </div>
          </div>
        </div>

      </Router>
    )
  }
}

export default App
