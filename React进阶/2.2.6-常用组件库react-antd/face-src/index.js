import React,{Component} from 'react'
import {render,unmountComponentAtNode} from 'react-dom'

import {
  getInitialData
} from './api'
import { store } from '../src/store'
let root = document.getElementById('root')
class Init extends Component {
  render () {
    return (
      <div>
        loadig...
      </div>
    )
  }

  async getInitialData(){
    let initData = await getInitialData()
    Object.assign(global,{
      initData
    })
    unmountComponentAtNode(root)

    render(<Provider store={store}>
      <App/>
    </Provider>,root)
  }

  componentDidMount () {
    this.getInitialData()
  }

}


render(<Init/>,root)
