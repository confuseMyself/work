import {
	Svg,
	Line,
	Polyline,
	Rect,
	Point,
	Text
} from "./svg";
import {Component} from "react";
import React from "react";


class Grid extends Component{
	render() {
		let line = []
		for (let i = 1; i <11 ; i++) {
			line.push(
				<>
					<Line style={{stroke:'blue'}}>
						<Point x={100} y={400 - i*30}/>
						<Point x={400} y={400 - i* 30}/>
					</Line>
					<Line  style={{stroke:'blue'}}>
						<Point x={100+i*30} y={100}/>
						<Point x={100+i*30} y={400} />
					</Line>
				</>
			)
		}
		return (
			<>{line}</>
		)
	}
}

const color = ['green','red','purple','orange','black']

class Legend extends Component{
	color = color
	render() {
		const {
			color,
			data
		} = this.props
		let nodes = data.map((item,index) => (
			<>
				<Rect x={100 + index * 70} y={50} width={50} height={20} style={{fill: this.color[index]}}/>
				<Text x={100 + index * 70} y={50} width={50} height={20} style={{fill: this.color[index]}}>{item}</Text>
				</>
		))

		return nodes
	}
}

class BarChart extends Component{
	color = color
	render() {
		const {
			data
		} = this.props
		const {
			color
		} = this
		return (
			<div style={{width:'500px',height:'500px'}}>

				<Svg >
					<Line>
						<Point x={100} y={400}/>
						<Point x={400} y={400}/>
					</Line>
					<Line>
						<Point x={100} y={100}/>
						<Point x={100} y={400}/>
					</Line>
					{
						data.map((item,index) => (
							<Rect x={100 + index * 70} y={400 - item} width={20} height={item} style={{fill: this.color[index]}}/>
						))
					}

					<Rect />
					{this.props.children}
				</Svg>
			</div>
		);
	}
}
// 1 定义组件
// 2 写伪代码
// 3 丰富基础逻辑

export default class App extends Component{
	render() {
		return (
			<div>
				<BarChart
					name='8月销售数据'
					data={[100,150,200,300]}

				>

					 <Grid/>
						<Legend data={['第一周','第二周','第三周','第四周']}/>
				</BarChart>
			</div>
		);
	}
}
