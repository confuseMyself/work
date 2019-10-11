import React, { Component } from 'react'
import {
  Menu,Icon
} from 'antd'
import {history} from '../../config'
const { SubMenu } = Menu;
class Sider extends Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render () {
    console.log(this.props)
    return <div className='app-body__sider'>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='dark'
        inlineCollapsed={this.state.collapsed}
        onClick={(a,b) => {
          console.log(a,b)
          history.push(a.key)
        }}
      >
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='mail' />
              <span>后台</span>
            </span>
          }
        >
          <Menu.Item key='user'>用户管理</Menu.Item>
          <Menu.Item key='auth'>权限管理</Menu.Item>
          <Menu.Item key='log'>日志</Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          title={
            <span>
              <Icon type='appstore' />
              <span>前台</span>
            </span>
          }
        >
          <Menu.Item key='good'>商品管理</Menu.Item>
          <Menu.Item key='business'>商家管理</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  }
}

export default Sider
