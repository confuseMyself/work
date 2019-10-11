import React,{Component,useState} from 'react'
import {
	useTrail,
	animated
} from 'react-spring'
const items = ['Lorem', 'ipsum', 'dolor', 'sit']
// const config = { mass: 5, tension: 2000, friction: 200 }

export default function App() {
	// const [toggle,set] = useState(true)
	const [trail, set, stop] = useTrail(items.length,  () => ({
		opacity: 1,
		height: 80,
		from: { opacity: 0,  height: 0 },
	}))
	console.log(trail,'trail')
	return (
		<div className="trails-main">
			<div>
				{trail.map((style, index) => (
					<animated.div
						key={items[index]}
						className="trails-text"
						style={style}

					>
						<p>
							{items[index]}<button onClick={e => {
							set({
								opacity: 0,
								height: 0,
							})

								// trail[index].opacity = 0
						}}>delete</button>

						</p>
					</animated.div>
				))}
			</div>
		</div>
	)
}
