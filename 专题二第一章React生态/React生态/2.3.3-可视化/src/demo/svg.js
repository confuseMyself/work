import React,{Component} from 'react'

const DEFAULT_PROPS = {
	style:{stroke:'red',strokeWidth:1}
}


export class Rect extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		return (
			<rect {...this.props}/>
		)
	}
}
export class Circle extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		return (
			<circle {...this.props}></circle>
		)
	}
}

export class Ellipse  extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		return (
			<ellipse {...this.props}></ellipse>
		)
	}
}


export class Svg extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		return (
			<svg
				width="100%"
				height="100%"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg">
				{this.props.children}
			</svg>
		);
	}
}

export class Point extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {

		return null
	}
}
export class Line extends Component{
	static defaultProps = DEFAULT_PROPS
	get start(){
		return this.props.children[0].props
	}
	get end(){
		return this.props.children[1].props
	}

	render() {
		return <line x1={this.start.x} y1={this.start.y} x2={this.end.x} y2={this.end.y} {...this.props}>{this.props.children}</line>
	}
}

export class Polygon extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		let points = this.props.children.map(item => {
			return item.props.x + ',' + item.props.y
		}).join(' ')
		return (
			<polygon {...this.props} points={points}>
				{this.props.children}
			</polygon>
		);
	}
}

export class Polyline  extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		let points = this.props.children.map(item => {
			return item.props.x + ',' + item.props.y
		}).join(' ')
		return (
			<polyline {...this.props} points={points}>
				{this.props.children}
			</polyline>
		);
	}
}

class Path extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		return (
			<path>
				{this.props.children}
			</path>
		);
	}
}

const Move = () => null

export class Text extends Component{
	render() {
		return (
			<text {...this.props}>{this.props.children}</text>
		);
	}
}

export default class App extends Component{
	render() {
		return (
			<div>
				<Svg>

					<Circle
						cx={50}
						cy={20}
						r={10}
						stroke={'black'}
					/>

					<Ellipse
						cx={150}
						cy={120}
						rx={10}
						ry={30}
						stroke={'black'}
					/>

					<Line >
						<Point x={10} y={10}/>
						<Point x={10} y={100}/>
					</Line>

					<Polygon>
						<Point x={220} y={100}/>
						<Point x={300} y={210}/>
						<Point x={170} y={250}/>
					</Polygon>

					<Polyline>
						<Point x={20} y={100}/>
						<Point x={30} y={210}/>
						<Point x={70} y={250}/>
					</Polyline>

					<Path>
						<Move />
					</Path>
				</Svg>


			</div>
		);
	}
}
