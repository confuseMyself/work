import React,{Component}from 'react'
import {inject, observer} from "mobx-react";

@inject('friend') // 将mobx store 按需注入到组件的props上，利用react context上下文来实现的 
@observer
class Friend extends Component{
	render() {
		console.log(this.props)
		const {
			friend
		} = this.props
		return (
			<div>
				|{friend.list.map(item => <span onClick={() => {
					friend.activeId = item.id
			}} key={item.name}>{item.name} | </span>)}
			</div>
		);
	}
}

export default Friend
