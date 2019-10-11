import React from 'react';
import ReactDOM from 'react-dom'

import inp from './input'



class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false
		}
	}

	render() {
		return (
			<div>
				app
				{this.state.data.map(item => <p>{item}</p>)}
			</div>
		)
	}

	componentDidMount() {
		inp.show({
			onOk:(value) => {
				alert(value)
			}
		})
	}


}
export default App;
