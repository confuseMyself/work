import React from 'react';
import ReactDOM from 'react-dom';

import {AnimateItem, AnimateList} from "./ani";


class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			list :[
				'a',
				'b',
				'c',
				'd'
			],
			value: ''
		}
	}

	render() {
		const {
			list,
			value
		} = this.state
		return (
			<div>
				<input value={value} onChange={e => this.setState({value: e.target.value})}/><button onClick={e => {
				list.push(value)
				this.setState({
					list
				})
			}}>add</button>
				<AnimateList
					delayTime='0.2'
					runTime='0.2'
					mountStyle={{
						marginLeft: '15px'
					}}
					unMountStyle={{
						marginLeft: 0
					}}
					remove={(index) => {
						list.splice(index,1)
						this.setState({
							list
						})
					}}
				>
					{
						this.state.list.map((item,index) => <AnimateItem
							index={index+1} key={item} render={(remove) => (
							<p>hello {item} <button onClick={e => {
								remove(index)
							}}>delete</button>
							</p>
						)}>

						</AnimateItem>)
					}
				</AnimateList>
			</div>
		);
	}
}

export default App;
