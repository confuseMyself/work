import React,{Component} from 'react';
import {
	observable,
} from 'mobx'
import Friend from './views/friend'
import Post from './views/post'
import Action from './views/action'
// import Action from './views/action'

import {
	observer,
	inject
} from 'mobx-react'

@inject('friend','post')
@observer // 将组件变成响应式组件，原理：用mobx的autoRun装饰react组件的render函数，达到强制渲染react组件的目的。
class App extends Component{



	render() {
		console.log(this.props,'this.props')
		return (
			<div>
				<h2>好友列表</h2>
				<Friend/>
				<h2>全部说说</h2>
				<Post />

				<Action name="123"/>
			</div>
		);
	}

	componentDidMount() {

	}

}



export default App;
