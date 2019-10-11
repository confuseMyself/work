import React from "react";
import PropTypes from 'prop-types'
class Provider extends React.Component{
	getChildContext () {
		return this.props.store
	}
	// 声明Context对象属性
	static childContextTypes = {
		name: PropTypes.string,
		age: PropTypes.number
	}
	constructor(props){
		super(props)
		this.state = {
			name: 'provider-user'
		}
	}
	render() {
		return this.props.children
	}
}

class BaseUser extends React.Component{
	render() {
		return (
			<div>
				{this.props.name}
			</div>
		);
	}
}
class BasePost extends React.Component{
	render() {
		return (
			<div>
				{this.props.age}
			</div>
		);
	}
}
// 高阶组件  属性代理
const connect = (Com) => {
	class ConnectComponent extends React.Component {
		// 声明需要使用的Context属性
		// 声明之后可以直接使用this.context访问
		static contextTypes = Provider.childContextTypes
		displayName = Com.displayName
		render() {
			return (
				<Com {...this.context}/>
			);
		}
	}
	return ConnectComponent
}


const User = connect(BaseUser)
const Post = connect(BasePost)
const store = {
	name: 'ryan',
	age:10
}



class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<User/>
					<Post/>
				</div>
			</Provider>
		);
	}
}

export default App
