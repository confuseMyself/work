import React,{Component} from 'react';
import './App.css';



class List extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'a',id:0},
				{name: 'b',id:1},
				{name: 'c',id:2}
			],
		}
	}
	render() {
		return (
			<div>
				{this.state.data.map(item => <p key={item.id}>{item.name}</p>)}
			</div>
		);
	}

	clear() {
		this.setState({
			data: []
		})
	}
}


class App extends React.Component{
	render() {
		return (
			<div>
				 <List ref='list'/>
			</div>
		);
	}

	componentDidMount() {

		window.app = this

		// this.refs.list.clear()
	}

}


export default App;
