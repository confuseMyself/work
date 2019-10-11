import React from 'react';
import ReactDOM from 'react-dom'

import inp from './input'

class LogComponent extends React.Component{
	componentWillUnmount() {
		console.log('app','unmount')
	}
}


class App extends LogComponent{
	render() {
		return (
			<div>
				app
			</div>
		);
	}
}


export default App;
