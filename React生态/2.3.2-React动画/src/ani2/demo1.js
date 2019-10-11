import React,{Component,PureComponent} from 'react'
import Animate from './index'
import {AnimateList} from "../ani";
export default class App extends Component{
	render() {
		return (
			<div>
				<Animate>
					<p>hello</p>
				</Animate>
			</div>
		);
	}
}