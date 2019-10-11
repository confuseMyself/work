import React,{Component} from 'react';
import './App.css';

class EventComponent extends Component{
	cb = {}
	on(name,cb) {
		this.cb[name] = cb
	}
	off(name) {
		delete this.cb[name]
	}
	trigger(name,arg) {
		this.cb[name](arg)
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
		let listInstance = this.refs.list
		let actionInstance = this.refs.action
		actionInstance.on('add',(name) => {
			listInstance.add(name)
		})
		window.app = this

		// this.refs.list.clear()
	}

}


export default App;
