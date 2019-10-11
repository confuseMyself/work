import React,{useEffect,useState,Component} from 'react';
import logo from './logo.svg';
import './App.css';
let app
const App = () => {
	let [time, setTime] = useState(0)
	return (
		<div >
			hello world {time} <button onClick={(e) =>setTime(time ++ )}> 增加</button>
		</div>
	)
}

class App2 extends Component{
	constructor(props){
		super(props)
		this.state = {
			time: 0
		}
	}

	render() {
		const {
			time
		} = this.state
		return (
			<div>
				hello world {time}  <button onClick={(e) => this.setState({
				time: time+1
			})}> 增加</button>
			</div>
		);
	}

	componentDidMount() {

	}
	

}



export default App;
