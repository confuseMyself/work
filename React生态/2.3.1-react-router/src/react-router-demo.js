import React from "react";
import {Router,Route,BrowserRouter} from 'react-router-dom'
import {createBrowserHistory} from 'history'
let BrowserHistory = createBrowserHistory()
class AA extends React.Component{
	render() {
		return (
			<div>
				aa
			</div>
		);
	}
}
class BB extends React.Component{
	render() {
		return (
			<div>
				bb
			</div>
		);
	}
}



function App() {
	return (
		<div className="App">
			<BrowserRouter basename={'/users'}>
				<header className="App-header" >
					<div>header</div>
					<Route path='/aa' component={AA}/>
					<Route path='/bb' component={BB}/>
				</header>
			</BrowserRouter>

		</div>
	);
}

export default App
