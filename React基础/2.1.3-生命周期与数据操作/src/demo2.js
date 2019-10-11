import React,{Component} from 'react';

class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			name: 'react'
		}
	}

	render() {
		console.log('App rerender')
		return (
			<div>
				{this.state.name}
				{this.state.name && <Son1 name={this.state.name + '-son'}/>}
			</div>
		);
	}

	componentDidMount() {
		window.app = this

		console.log('App mount')
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('App will update')
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('App did update')
	}


}


class Son1 extends Component{
	render() {
		console.log('son1 rerender')
		return (
			<div>
				{this.props.name}
				<GrandSon1 name={this.props.name + '-grand'}/>
			</div>
		);
	}
	componentDidMount() {
		console.log('Son1 mount')
	}
	componentWillUpdate(nextProps, nextState) {
		console.log('son1 will update')
	}


	componentDidUpdate(prevProps, prevState) {
		console.log('son1 did update')
	}

	componentWillUnmount() {
		console.log('Son1 unmout')
	}

}

class GrandSon1 extends Component{
	render() {
		console.log('GrandSon1 rerender')
		return (
			<div>
				{this.props.name}
			</div>
		);
	}
	componentDidMount() {
		console.log('GrandSon1 mount')
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('GrandSon1 will update')
	}


	componentDidUpdate(prevProps, prevState) {
		console.log('GrandSon1 did update')
	}


	componentWillUnmount() {
		console.log('GrandSOn1 unmout')
	}
}
export default App
