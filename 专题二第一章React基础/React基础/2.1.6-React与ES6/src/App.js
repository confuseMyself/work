import React from 'react';
import logo from './logo.svg';
import './App.css';

class  App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			name: 'react & es6',
			lesson: '6',
			teacher:{
				teacherName:'ryan',
				age:30
			},
			skills:['vue','react','nodejs','webpack'],
			friend:{
				name:'aa'
			}
		}
	}
	render() {
		let {
			name,
			lesson,
			teacher:{
				teacherName,
				age
			},
			skills:[vue1, react1,nodejs1,webpack1],
			friend:{
				name: friendName
			}
		} = this.state
		return (
			<div>
				<p>{name} - {lesson}</p>
				<p>
					{teacherName} - {age}
				</p>
				<p>
					{vue1} - {react1} - {nodejs1} - {webpack1}
				</p>
				<p>{friendName}</p>
        App
			</div>
		);
	}
}





export default App;
