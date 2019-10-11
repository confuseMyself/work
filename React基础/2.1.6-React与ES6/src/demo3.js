import React from 'react';
import ReactDOM from 'react-dom'

import inp from './input'

class LoadingComponent extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	render() {
		const {
			loading
		} = this.state
		return (
			<div>

				{loading ? 'loading....' : ''}
			</div>
		);
	}
	showLoading() {
		this.setState({
			loading: true
		})
	}
	hideLoading(){
		this.setState({
			loading: false
		})
	}
}


class App extends LoadingComponent{
	render() {
		return (
			<div>
				{super.render()}
				app
			</div>
		);
	}

	componentDidMount() {
		this.showLoading()
		setTimeout(() => {
			this.hideLoading()
		},3000)
	}
}

let obj = new Proxy({
	a:10,
	b:20
}, {
	get: function (target,key,) {
		console.log('get ',key)
		return target[key] * 10
	},
	set: function (target,key,value) {
		return Reflect.set(target,key,value)
	}
})

window.obj = obj

export default App;
