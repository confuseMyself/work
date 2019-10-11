import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'



class App extends React.Component {
	render() {
		return (
			<div>
				app
			</div>
		);
	}

	getValue() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve('ryan')
			}, 3000)
		})
	}


	async componentDidMount() {
		let {
			data: {
				data
			}
		} = await axios
			.get('http://localhost:7777/api')

		console.log(data)
		let value = await this.getValue()
		console.log(value)
	}

	componentDidMount2() {
		// return false;

		// axios
		// 	.get('http://localhost:7777/api').then({
		// 		data: {
		// 			data
		// 		}
		// 	} => {

		// 			console.log(data)
		// 		this.getValue().then(value => {
		// 				console.log(value)
		// 			})

		// 		})
	}

}

export default App
