import React, { useReducer } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Provider from 'react-redux/es/components/Provider'
import { store } from './store'
import App from './App'
import 'antd/dist/antd.css'
import {
  getInitData
} from './api/auth'

let root = document.getElementById('root')
class Init extends React.Component {
  render () {
    return (
      <div>
        init
      </div>
    )
  }

  renderApp (initData) {
    unmountComponentAtNode(root)
    Object.assign(global, {
      initData
    })
    render(
      <Provider store={store}>
        <App />
      </Provider>, root
    )
  }

  componentDidMount () {
    getInitData().then(initData => {
      this.renderApp(initData)
    })
  }
}

render(<Init />, root)
