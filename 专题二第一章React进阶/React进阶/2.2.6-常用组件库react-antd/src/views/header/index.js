import React, { Component } from 'react'
import {
  Popover,
  Button
} from 'antd'
import {history} from '../../config'
const content = (
  <div>
    <p to='/logout' onClick={e => {
      history.push('/logout')
    }}>退出</p>

  </div>
);

class Header extends Component {
  render () {
    return (
      <>
        <div className='app__header__logo'>React学习</div>
        <div className='app__header__ad'>学而时习之</div>
        <div className='app__header__action'>

          <Popover content={content} title="Title" trigger="click">
            <span>ryan</span>
          </Popover>
        </div>
      </>
    )
  }
}

export default Header
