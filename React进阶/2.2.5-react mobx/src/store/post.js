import {
	observable,
	action
} from 'mobx'


const addForm = {
	title : '',
	content : '',
	friendId : '',
}

class Post {
	@observable
	 addForm = {
		...addForm
	}

	@observable list = [
		{
			title:'hello ryan',
			content: 'hello ryan post 1',
			id:1,
			friendId:1
		},
		{
			title:'hello ryan 1',
			content: 'hello ryan post 2',
			id:2,
			friendId:1
		},
		{
			title:'hello ryan 2',
			content: 'hello ryan post 3',
			id:3,
			friendId:1
		}
	]

	@action
	handleAdd(){
		this.list.push({...this.addForm})
	}

	@action
	clear(){
		this.addForm = {
			...addForm
		}
	}
}
const post = new Post()
export default post
