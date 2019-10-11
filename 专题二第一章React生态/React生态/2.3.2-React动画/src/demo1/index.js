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
				width: this.state.width + 10 // 不建议使用状态来使用动画，建议通过ref 查找dom，直接改变dom的style或者class
			})
		},13)
	}
}
export default App
