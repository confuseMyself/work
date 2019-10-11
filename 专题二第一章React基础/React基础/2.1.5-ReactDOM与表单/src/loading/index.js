import ReactDOM from "react-dom";
import React from "react";
import './index.css'


class Loading extends React.Component{
	render() {
		return (
			<div className='loading'>
				<div className='loading__mask'></div>
				<div className='loading__content'>
					loading
				</div>
			</div>
		);
	}
}
let node = null
const loading = {
	show() {
		node = document.createElement('div')
		document.body.appendChild(node)
		ReactDOM.render(<Loading />, node)
	},
	hide() {
		if(node) {
			ReactDOM.unmountComponentAtNode(node)
			document.body.removeChild(node)
		}
	}
}

export default loading
