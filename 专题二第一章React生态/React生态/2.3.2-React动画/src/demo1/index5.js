import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {useSpring, animated} from 'react-spring'




function App() {
	const props = useSpring({
		to: async (next, cancel) => {
			await next({opacity: 1, color: '#ffaaee'})
			await next({opacity: 0.5, color: 'rgb(14,26,19)'})
			await next({marginLeft: 500, color: 'rgb(14,26,19)'})
		},
		from: {opacity: 0, color: 'red'}
	})

	return <animated.div style={props}>hello world</animated.div>
}


export default App
