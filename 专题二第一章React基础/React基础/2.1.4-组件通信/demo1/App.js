import React,{Component} from 'react';
import './App.css';


class Clock extends Component {
	render() {
		let {
			onWakeup,
			onSleep,
			time
		} = this.props
		if(time === 9) {
			onWakeup()
		}
		if(time === 21) {
			onSleep()
		}

		return (
			<div>
				clock
			</div>
		);
	}
}


class App extends React.Component{



	render() {

		return (
			<div>
				<Clock
					time={12}
					onWakeup={() => {
						alert('wake up')
					}}

					onSleep={( ) => {
						alert("sleep")
					}}
				/>

			</div>
		);
	}
}


export default App;
