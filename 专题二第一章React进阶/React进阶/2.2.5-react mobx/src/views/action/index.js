import React,{Component}from 'react'
import {inject, observer} from "mobx-react";
import {
	observable
} from 'mobx'
@inject('post')
@observer
class Action extends Component{
	render() {
		console.log(this.props)
		const {
			post
		} = this.props
		return (
			<div>
				<div>
					<input placeholder='title' value={post.addForm.title} onChange={(e) => post.addForm.title = e.target.value }/>
				</div>
				<div>
					<input placeholder='content' value={post.addForm.content} onChange={(e) => post.addForm.content = e.target.value }/>
				</div>
				<div>
					<input type='number' placeholder='friendId' value={post.addForm.friendId} onChange={(e) => post.addForm.friendId = parseInt(e.target.value) }/>
				</div>
				<button onClick={(e) => {
					// post.list.push()
					post.handleAdd()
				}}>add</button>
			</div>
		);
	}
	componentWillUnmount(){
		
	}
}

export default Action
