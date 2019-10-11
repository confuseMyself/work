import React from "react";

class Provider extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			name: 'provider-user'
		}
	}
	render() {
		return this.props.render(this.state.name)
	}
}

class User extends React.Component{
	render() {
		return (
			<div>
				{this.props.data}
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<Provider render={(data) => <User data={data}/>}/>
		);
	}
}

export default App
