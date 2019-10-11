import React, { Component } from "react";
import PropTypes from 'prop-types'
let store = {
	name: 'ryan',
	age: 10
}
// 用于预先 将业务组件，进行数据的封装，便于我们 方便获取数据
// 代理模式
const connect = key => Com => {
	class connectComponent extends Component {
		constructor(props) {
			super(props)
			let that = this
			this.state = {
				[key]: store[key],
				proxy: new Proxy(store, {
					get: function (target, key, receiver) {
						return Reflect.get(target, key, receiver);
					},
					set: function (target, key, value, receiver) {
						that.setState({
							[key]: value
						})
						return Reflect.set(target, key, value, receiver);
					}
				})
			}
		}
		render() {
			return <Com {...this.state} />
		}
		componentDidMount() {
			// let that = this
			// let p = new Proxy(store, {
			// 	get: function (target, key, receiver) {
			// 		return Reflect.get(target, key, receiver);
			// 	},
			// 	set: function (target, key, value, receiver) {
			// 		that.setState({
			// 			[key]: value
			// 		})
			// 		return Reflect.set(target, key, value, receiver);
			// 	}
			// });
			// this.setState({
			// 	proxy: p
			// })
		}

	}
	return connectComponent
}



@connect('age')
class User extends Component {
	render() {
		let {age,name,proxy} = this.props
		return (
			<div>

				<button onClick={
					() => {
						proxy.age = 30
					}
				}>点击更改proxy</button>
				{age}

			</div>
		)
	}
}


class App extends Component {
	render() {
		return (
			<div>
				<User /><br /><User />

			</div>
		)
	}
}


export default App
