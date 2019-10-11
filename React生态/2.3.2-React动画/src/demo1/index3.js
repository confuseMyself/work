import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'animate.css'

class Animate extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}

	componentDidMount() {
		const {
			in: inMode,
			out: outMode
		} = this.props
		const element = ReactDOM.findDOMNode(this)
		element.classList.add('animated', inMode)
	}
	componentWillUnmount() {
		const {
			in: inMode,
			out: outMode
		} = this.props
		const element = ReactDOM.findDOMNode(this)
		element.classList.add('animated', outMode)
	}

}

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ain: true
		}
	}
	render() {
		let { ain } = this.state;
		return (
			<div>
				{
					ain && <Animate in='fadeIn' out='bounceOutDown'>
						<p>hello world</p>
					</Animate>
				}

				<button onClick={() => { this.setState({ ain: !ain }) }}>切换组件</button>
			</div>
		);
	}
}


export default App
