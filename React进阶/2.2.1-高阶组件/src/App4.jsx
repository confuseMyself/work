import React, { Component } from "react";
import PropTypes from 'prop-types'

// 用于预先 将业务组件，进行数据的封装，便于我们 方便获取数据
// 反向继承 交互的封装，
const loading = Com => {
	class LoadingComponent extends Com {
		// componentDidMount(){
		// 	console.log(123)
		// }
		showLoading() {
			console.log('loading')
		}
		hideLoading() {
			console.log('hide')
		}
	}
	return LoadingComponent
}
function decorateArmour(target, key, descriptor) {
	const method = descriptor.value;
	let moreDef = 100;
	let ret;
	descriptor.value = (...args) => {
		args[0] += moreDef;
		ret = method.apply(target, args);
		return ret;
	}
	return descriptor;
}


@loading
class User extends Component {
	constructor(props){
		super(props)
	}
	render() {
		return <div>user</div>
	}
	componentDidMount() {
		this.showLoading()
		// //http
		this.hideLoading()
	}
}

class App extends Component {
	render() {
		return <User />
	}
}

export default App
