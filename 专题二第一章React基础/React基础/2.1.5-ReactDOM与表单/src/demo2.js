import React from 'react';
import ReactDOM from 'react-dom'

import inp from './input'

class Action extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	render() {
		const {
			onAdd
		} = this.props
		return (
			<div>
				<input value={this.state.value} onChange={(e) =>this.setState({value: e.target.value})}/>
				<button onClick={(e) => onAdd(this.state.value)}>提交</button>
			</div>
		);
	}
}

class TodoList extends React.Component{
	render() {
		const {
			data,
			onDelete
		} = this.props
		return (
			<div>
				{data.map((item,index) => (
					<ol>
						<li>
							<p>{item}</p>
							<button onClick={(e) => {
								onDelete(index)
							}}>删除</button>
						</li>
					</ol>
				))}
			</div>
		);
	}
}
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
				<Action onAdd={(name) => {
					let data = this.state.data
					data.push(name)
					this.setState({data})
				}}/>
				<TodoList
					data={this.state.data}
					onDelete={(index) => {
						let data = this.state.data
						data.splice(index,1)
						this.setState({data})
					}}
				/>

			</div>
		)
	}

	componentDidMount() {

	}
}

// 方法组件 ： confirm
// 方法组件 : tooltip message
// todolist ： 编辑
export default App;
