import React from 'react';
import logo from './logo.svg';
import './App.css';
import Icon from './react-ui/Icon'
import Button from './react-ui/Button'
import Input from './react-ui/Input'
import Table from './react-ui/Table'

let dataSource=[
	{
		name:'ryan',age:'30',sex:'man',
	},
	{
		name:'ryan2',age:'31',sex:'man',
	},
	{
		name:'ryan3',age:'32',sex:'man',
	}
]

class  App extends React.Component{
	constructor(props) {
		super(props);
		this.state ={
			value: 'a'
		}
	}
	value = '1'

	render() {
		return (
			<div>
				<Icon onClick={() => {
					alert('hello icon')
				}} name='jiadian-dianfanguo' style={{color:'red'}}/>

				<Button type='primary' icon='dianpu'>提交</Button>


				<Button type='warning' icon='dianpu'>提交</Button>
				<br/>
				<Input size='large'/>
				<br/>
				<Input size='middle' prefix='dianpu'/>
				<br/>
				<Input size='small'
				       value={this.state.value}
				       onChange={(e) => {
									this.setState({
										value: e.target.value
									})
				}}
				/>
				<Input
					rule={/\d/}
					message="只允许输入数字"
					size='small' defalutValue={this.value} onChange={(e) => {
					this.value = e.target.value
				}}/>
				<Table
					columns={[
						{title: '姓名', dataIndex:"name",key: 'name', render(text, item, index){
							return <div><a href='#'>{text} ? {item.age} + {index}</a></div>
						}},
						{title: '年龄', dataIndex:"age",key: 'age'},
						{title: '性别', dataIndex:"sex",key: 'sex'},
					]}
					dataSource={dataSource}

				/>
			</div>
		);
	}
}





export default App;
