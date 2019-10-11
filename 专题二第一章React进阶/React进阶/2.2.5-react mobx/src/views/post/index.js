import React,{Component}from 'react'
import {inject, observer} from "mobx-react";


@inject('friend')
@observer
class Post extends Component{
	render() {
		const {
			friend
		} = this.props

		console.log(friend.friendPost.length,friend.activeId)
		return (
			<div>
				{friend.friendPost.map(item => <div>
					<h4>{item.title}</h4>
					<p>{item.content}</p>
				</div>)}
			</div>
		);
	}
}

export default Post
