import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 100
		}
	}

	render() {
		return (
			<div style={{border:'1px solid red',width: this.state.width +'px'}}>
			</div>
		);
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({
				width: this.state.width + 10
			})
		},13)
	}
}
export default App
