import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import 'animate.css'

export default class Animate extends Component{
	render() {
		return (
			<div>
				{this.props.children}

			</div>
		);
	}

	componentDidMount() {
		let dom = ReactDOM.findDOMNode(this)
		dom.classList.add('animated')
		setTimeout(() => {
			dom.classList.add('shake')
		})
	}

}
