import {Component} from "react";
import React from "react";


const DEFAULT_PROPS = {
	style:{stroke:'red',strokeWidth:3,fill:"none"}
}


export class Svg extends Component{
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

export class Text extends Component{
	render() {
		return (
			<text {...this.props}>{this.props.children}</text>
		);
	}
}

export class Line  extends Component{
	static defaultProps = DEFAULT_PROPS
	get start(){
		return this.props.children[0].props
	}
	get end() {
		return this.props.children[1].props
	}
	render() {
		return <line x1={this.start.x} y1={this.start.y} x2={this.end.x} y2={this.end.y} style={this.props.style}>{this.props.children}</line>
	}
}

export class Point extends Component{
	render() {
		return null
	}
}


class PolyLine  extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		const points = this.props.children.map(item => {
			return item.props.x + ',' + item.props.y
		}).join(' ')

		return (
			<polyline points={points}  style={this.props.style}>
				{this.props.children}
			</polyline>
		);
	}
}


class Polygon  extends Component{
	static defaultProps = DEFAULT_PROPS
	render() {
		const points = this.props.children.map(item => {
			return item.props.x + ',' + item.props.y
		}).join(' ')

		return (
			<polygon  points={points}  style={this.props.style}>
				{this.props.children}
			</polygon>
		);
	}
}

export default class App extends Component{
	render() {
		return (
			<div style={{paddingBottom:"200px"}}>
				<Svg>
					{/*<Circle*/}
						{/*cx={50}*/}
						{/*cy={20}*/}
						{/*r={10}*/}
						{/*stroke={'black'}*/}
					{/*/>*/}
					{/*<Ellipse*/}
						{/*cx={150}*/}
						{/*cy={120}*/}
						{/*rx={10}*/}
						{/*ry={30}*/}
						{/*stroke={'black'}*/}
					{/*/>*/}

					{/*<Line >*/}
						{/*<Point x={10} y={10}/>*/}
						{/*<Point x={10} y={100}/>*/}
					{/*</Line>*/}
					{/*<Line >*/}
						{/*<Point x={10} y={10}/>*/}
						{/*<Point x={100} y={10}/>*/}
					{/*</Line>*/}


					{/*<PolyLine>*/}
						{/*<Point x={0} y={0}/>*/}
						{/*<Point x={10} y={10}/>*/}
						{/*<Point x={70} y={30}/>*/}
						{/*<Point x={20} y={50}/>*/}
					{/*</PolyLine>*/}


					<Polygon>
						<Point x={0} y={0}/>
						<Point x={10} y={10}/>
						<Point x={70} y={30}/>
						<Point x={20} y={50}/>
					</Polygon>
				</Svg>


			</div>
		);
	}
}
