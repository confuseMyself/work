import {Component} from "react";
import React from "react";
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
class Canvas extends Component{
	state = {
		children: [],
		ctx: null
	}
	static childContextTypes = {
		ctx: PropTypes.object
	}
	getChildContext () {
		return {
			ctx: this.state.ctx
		}
	}
	render() {
		return (
			<canvas>
				{this.state.children}
			</canvas>
		);
	}

	componentDidMount() {
		let ctx=ReactDOM.findDOMNode(this).getContext("2d");
		ctx.pos = {
			x:0,
			y:0
		}
		this.setState({
			children: this.props.children,
			ctx
		})
	}

}

class Rect extends Component{
	static contextTypes = {
		ctx: PropTypes.object
	}

	render() {
		const {
			ctx
		} = this.context
		const {
			x, y, width, height
		} = this.props

		console.log(ctx,'ctx in rect')
		ctx.strokeRect(x, y, width, height)
		return null
	}
}

class Path extends Component{
	static contextTypes = {
		ctx: PropTypes.object
	}
	render() {
		const {
			ctx
		} = this.context
		console.log(this.context.ctx,'path')
		ctx.beginPath()
		this.props.children.forEach(item => {
			if(item.type === Point) {
				ctx.lineTo(item.props.x, item.props.y)
				ctx.pos = {x: item.props.x, y: item.props.y} // 记录一下canvas 的笔绘制到哪儿了
			}
			if(item.type === Arc){
				ctx.arc(ctx.pos.x,ctx.pos.y,item.props.r,item.props.from,item.props.to,false)
			}
		})

		ctx.closePath()
		ctx.stroke()
		return null
	}
}

class Point extends Component{
	static contextTypes = {
		ctx: PropTypes.object
	}
	render() {
		const {
			ctx
		} = this.context
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

class Arc extends Component{
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}



class Point extends Component{

}

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			x:0,
			y:0
		}
	}
	render () {

		let that = this
		return (
			<div>

				<Canvas >
					<Rect x={20} y={30} width={50} height={100}/>
					<Path>
						<Point name='line1' x={that.state.x} y={this.state.y}/>

						<Point name='line2' x={100} y={100}/>
						<Point name='line2' x={100} y={50}/>
						<Arc r={10} from={0} to={2*Math.PI}/>

						{/**/}
					</Path>
				</Canvas>

			</div>
		)
	}

	componentDidMount() {

	}

}
