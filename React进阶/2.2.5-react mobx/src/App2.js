import React,{Component} from 'react';
import {
	observable
} from 'mobx'

import {
	observer
} from 'mobx-react'

@observer
class App extends Component{

	@observable value = 'a'
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
				app
				<input value={this.value} onChange={e => this.value = e.target.value}/>
				{this.value}
			</div>
		);
	}

	componentDidMount() {

	}

}



export default App;
