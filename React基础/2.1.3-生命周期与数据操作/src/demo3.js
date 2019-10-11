import React from 'react'
import PropTypes from "prop-types";

class App extends React.Component{
	getChildContext() {
		return {color: "purple"};
	}

	constructor(props) {
		super(props);
		this.state = {
			name: 'react'
		}
	}

	render() {
		return (
			<div>
				{this.state.name}
				<Son/>
			</div>
		);
	}
}
App.childContextTypes = {
	color: PropTypes.string
}

class Son extends React.Component{
	render() {
		return (
			<div>
				<GrandSon/>
			</div>
		);
	}
}

class GrandSon  extends React.Component{
	render() {
		return (
			<div>
				<GrandSonGrandSon/>
			</div>
		);
	}
}

class GrandSonGrandSon extends React.Component{
	render() {
		return (
			<div>
				{this.context.color}
			</div>
		);
	}
}
GrandSonGrandSon.contextTypes = {
	color: PropTypes.string
};


export default App
