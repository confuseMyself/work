import React,{Component,useState,useEffect} from 'react'
import {
	useTrail,
	animated,
	useSprings,
} from 'react-spring'

// const config = { mass: 5, tension: 2000, friction: 200 }

export default function App() {
	const [springs, set, stop] = useSprings(4, index => {
		return {
			opacity:0,
			height: 0
		}
	})


	// cdm
	// crp
	useEffect(() => {
		set(index => {
			return {
				opacity: 1,
				height: 80
			}
		})
	})

	return (
		<div className="trails-main">
			<div>
				{springs.map((style, index) => (
					<animated.div
						key={index}
						className="trails-text"
						style={style}
						onClick={(e) => {
							set(i => {
								if(index === i) {
									return {
										opacity: 0,
										height: 0
									}
								}
								return {
									opacity: 1,
									height: 80
								}
							})
						}}
					>
						hello {index}
					</animated.div>
				))}
			</div>
		</div>
	)
}
