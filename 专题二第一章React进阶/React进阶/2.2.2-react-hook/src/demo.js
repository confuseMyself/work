import React,{useState,useEffect} from 'react'


const Action = (props)=>{
	const [value,setValue] = useState('js')
	return (
		<div>
			<input value={value} onChange={(e) =>setValue(e.target.value)}/>
			<button onClick={(e) => props.onAdd(value)}>add</button>
		</div>
	)
}

const List = (props)=>{
	return (
		<div>
			{props.data.map(item => (
				<div key={item.id}>
					<span>{item.name}</span><button>del</button>
				</div>
			))}

		</div>
	)
}

const App = (props) => {
	const [data,setData] = useState([
		{name:'react',id:1},
		{name:'vue',id:2}])

	return (
		<div>

			<Action onAdd={(name) => {
				data.push({
					name:name,
					id: Math.random()
				})
				setData([...data])
			}}/>
			<List data={data} />
		</div>
	)
}

export default App
