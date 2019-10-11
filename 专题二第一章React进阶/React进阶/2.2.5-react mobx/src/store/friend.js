import {
	observable,computed,
	autorun
} from 'mobx'
import post from './post'



class Friend {
	@observable list = [
		{
			name:'ryan',
			id:1
		},
		{
			name:'xiao a',
			id:2
		},
		{
			name: 'xiao c',
			id: 3
		}
	]
	@observable activeId = 1

	@computed
	get friendPost(){
		return post.list.filter(item => item.friendId === this.activeId)
	}
}



const friend = new Friend()

export default friend
