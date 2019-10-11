import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {useSpring, animated} from 'react-spring'




function App() {
	const props = useSpring({
		to: [{opacity: 1, color: '#ffaaee'}, {opacity: 0, color: 'rgb(14,26,19)'}],
		from: {opacity: 0, color: 'red'}
	})

	return <animated.div style={props}>hello world</animated.div>
}


export default App
