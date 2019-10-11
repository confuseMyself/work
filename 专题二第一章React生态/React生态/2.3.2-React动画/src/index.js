import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './demo1/index3';
import * as serviceWorker from './serviceWorker';






// class App extends React.Component{
// 	constructor(props){
// 		super(props)
// 		this.state = {
// 			width: 100
// 		}
// 		this.width = 100
// 	}
// 	render() {
// 		return (
// 			<div ref={'dom'} style={{background:'red',width: this.state.width}}>
// 				app
// 			</div>
// 		);
// 	}
//
// 	componentDidMount() {
// 		setInterval(() => {
// 			// this.setState({
// 			// 	width: this.state.width + 10
// 			// })
// 			this.width = this.width + 10
// 			this.refs.dom.style.width = this.width + 'px'
// 		},13)
// 	}
// }






ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
