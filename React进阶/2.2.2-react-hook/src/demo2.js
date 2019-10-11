import React,{useState,useEffect,useRef} from 'react'

const useTitleHook = (title) => {
	// useEffect componentDidMount componentDidUpdate 

	// componentDidMount componentDidUpdate 
	// useEffect(()=>{

	// })

	// componentDidMount
	// useEffect(()=>{

	// },[])

	// shouldComponentUpdate
	// useEffect(()=>{

	// },[某一个useState])

	// componentWillMount
	// useEffect(()=>{
			// return ()=>{
			// 	// 需要清理的操作
			// }
	// },[])

	useEffect(() => {
		document.title = title
	},[title])
}


const App = (props) => {
	let [title,setTitle] = useState('hello')
	useTitleHook(title)
	
	return (
		<div >
			sss
			<input value={title} onChange={(e) => setTitle(e.target.value)}/>
		</div>
	)
}

export default App
