import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {useSpring, animated} from 'react-spring'

function App() {
	const props = useSpring({marginLeft: 100, from: {marginLeft: 0}})
	return <animated.div style={props}>{props.marginLeft}</animated.div>
}


export default App
