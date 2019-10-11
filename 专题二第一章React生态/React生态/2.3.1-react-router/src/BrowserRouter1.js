import React from "react";
import PropTypes from 'prop-types'
class Router extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			hash: this.getHash()
		}
		this.history = window.history
	}

	static childContextTypes = {
		hash: PropTypes.string,
	}

	getHash(){
		let url = window.location.pathname
		return url
	}

	getChildContext () {
		return {
			hash: this.state.hash
		}
	}

	componentDidMount() {
		// window.onhashchange = () => {
		// 	this.setState({
		// 		hash: this.getHash()
		// 	})
		// }
		let that = this
		this.history.route = (name) => {
			console.log(name,'sss')
			that.setState({
				hash: `${name}`
			})
			window.history.pushState(null,null,name)
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
