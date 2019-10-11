import React from "react";
import PropTypes from 'prop-types'
class Router extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			hash: window.location.hash
		}
	}
	// 定义上下文的type
	static childContextTypes = {
		hash: PropTypes.string,
	}

	getHash(){
		let url = window.location.hash.replace('#','')
		return url
	}
	// 定义上下文的值
	getChildContext () {
		return {
			hash: this.getHash()
		}
	}

	componentDidMount() {
		window.onhashchange = () => {
			this.setState({
				hash: this.getHash()
			})
		}
	}


	render() {
		return (
			<>
				{this.props.children}
			</>
		);
	}
}

class Route extends React.Component{
	static contextTypes = {
		hash: PropTypes.string
	}

	render() {
		const {
			path,
			component
		} = this.props
		let instance = null
		const {
			hash
		} = this.context
		if(path === hash) {
			// React.createElement 方法把一个类转换成react 组件
			instance = React.createElement(component,null,null)
		}
		return (
			<>
				{instance}
			</>
		);
	}
}

class AA extends React.Component{
	render() {
		return (
			<div>
				aa
			</div>
		);
	}
}
class BB extends React.Component{
	render() {
		return (
			<div>
				bb
			</div>
		);
	}
}



function App() {
	return (
		<div className="App">
			<Router >
				<header className="App-header">
					<div>header</div>
					<Route path='/aa' component={AA}/>
					<Route path='/bb' component={BB}/>
				</header>
			</Router>

		</div>
	);
}

export default App
