import React from 'react';
import ReactDOM from 'react-dom'

let loading = (Com) => {
	class LoadingComponent extends Com {
		constructor(props) {
			super(props);
			this.state = {
				loading: false,
				a:2,
				b:1
			}
		}
		render() {
			const {
				loading
			} = this.state
			return (
				<div>
					{super.render()}
					{loading ? 'loading....' : ''}
				</div>
			);
		}
		showLoading() {
			this.setState({
				loading: true
			})
		}
		hideLoading(){
			this.setState({
				loading: false
			})
		}
	}

	return LoadingComponent
}


@loading
class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			a:"c"
		}
	}
	render() {
		let {a,b} = this.state
		return (
			<div>
				app
				{a}-{b}
			</div>
		);
	}

	componentDidMount() {
		console.log(this) // 为什么 this 指向的是LoadingComponent
		this.showLoading();
		
		setTimeout(() => {
			this.hideLoading()
		}, 3000);
	}

}

export default App;
