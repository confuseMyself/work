import React,{Component} from 'react'
import ReactDOM  from 'react-dom'
import PropTypes from 'prop-types'
import {
	Rect,
	Point,
	Line,
	Svg
} from './svg'

class BarChart extends Component{
	padding = 0.1
	state = {
		width: 0,
		height: 0
	}
	static childContextTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		parent: PropTypes.object
	}
	getChildContext() {
		return {width: this.state.width,height: this.state.height,parent: this};
	}


	render() {
		const {
			data
		} = this.props
		const {
			width,
			height
		} = this.state
		const {
			padding
		} = this
		return (
			<Svg>
				<Line>
					<Point x={width*padding} y={height*(1-padding)}/>
					<Point x={width*(1-padding)} y={height*(1-padding)}/>
				</Line>
				<Line>
					<Point x={width*padding} y={height*padding}/>
					<Point x={width*padding} y={height*(1-padding)}/>
				</Line>
				{
					data.map((item,index) =>  <Rect x={index*30 + 10 + 100} y={500} width={20} height={item}/>)
				}
				{this.props.children}
			</Svg>
		)
	}

	componentDidMount() {
		const width = ReactDOM.findDOMNode(this).clientWidth
		const height = ReactDOM.findDOMNode(this).clientHeight
		this.setState({width,height})
	}

}
class Grid extends Component{
	static contextTypes ={
		width: PropTypes.number,
		height: PropTypes.number,
		parent: PropTypes.object
	}
	render() {
		let lines = []
		const {
			width,
			height,
			parent
		} = this.context
		const {
			padding
		} = parent

		for (let i = 0; i < 9; i++) {
			let y = height*(1-padding) * 0.1 * i
			let x = width*(1-padding) * 0.1 * i
			lines.push((
				<>
					<Line>
						<Point x={width*padding} y={height*(1-padding) - y }/>
						<Point x={width*(1-padding)} y={height*(1-padding) - y}/>
					</Line>
					<Line>
						<Point x={width*padding + x} y={height*padding}/>
						<Point x={width*padding + x} y={height*(1-padding)}/>
					</Line>
				</>
			))
		}
		return (
			<>
				{
					lines
				}
			</>
		)
	}
}
class Legend extends Component{
	render() {
		return null
	}
}


export default class App extends Component{
	render() {
		return (
			<BarChart
				data={
					[100,200,300]
				}
			>
				<Grid/>
				<Legend/>
			</BarChart>
		);
	}
}
