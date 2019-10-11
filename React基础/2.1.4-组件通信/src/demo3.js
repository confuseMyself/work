import React,{Component} from 'react';
import './App.css';

// 观察者模式
class EventComponent extends Component{
	cb = {}
	// 注册事件
	on(name,cb) {
		this.cb[name] = cb
	}
	// 删除事件
	off(name) {
		delete this.cb[name]
	}
	// 触发事件
	trigger(name,arg) {
		this.cb.a = 1;
		console.log(this)
		this.cb[name](arg)
	}
	add(type,data){
		this.cb[type] = data;
	}
}
class List extends EventComponent{
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'a',id:0},
				{name: 'b',id:1},
				{name: 'c',id:2}
			],
		}
	}
	render() {
		return (
			<div>
				{this.state.data.map(item => <p key={item.id}>{item.name}</p>)}
			</div>
		);
	}

	clear() {
		this.setState({
			data: []
		})
	}

	add(name) {
		let {
			data
		} = this.state
		data.push({
			name,
			id:name
		})
		this.setState({data})
	}
}

class Action extends EventComponent{
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	render() {
		return (
			<div>
				<input value={this.state.value} onChange={(e) => this.setState({value: e.target.value })}/>
				<button onClick={(e) =>{
					console.log(this);
					this.trigger('add', this.state.value)
				}}>add</button>
			</div>
		);
	}
}


class App extends EventComponent{
	render() {
		return (
			<div>
				 <List ref='list' />
				<Action ref='action'/>
			</div>
		);
	}

	componentDidMount() {
		let listInstance = this.refs.list; // 获取实列
		let actionInstance = this.refs.action; // 获取实列
		// 注册事件，实际上是注册在EventComponent上的；
		actionInstance.on('add',(name) => {
			listInstance.add(name)
		});
		listInstance.on('del',(name) => {
			
		});
		window.app = this

		// this.refs.list.clear()
	}

}


export default App;
