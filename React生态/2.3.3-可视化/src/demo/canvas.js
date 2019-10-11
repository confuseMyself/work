import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
class Rect extends Component {
  static contextTypes = {
    ctx: PropTypes.object
  }
  static defaultProps = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
  }

  render () {
    const {
      ctx
    } = this.context
    const {
      x, y, width, height
    } = this.props

    ctx.strokeRect(x, y, width, height)
    return null
  }

  componentDidMount () {
    console.log('hello')
  }
}

class Path extends Component {
	static contextTypes = {
		ctx: PropTypes.object
	}
  get ctx() {
    return this.context.ctx
  }
  render () {
		console.log(this.props.children,'cc')
	  this.ctx.beginPath();
		this.props.children.forEach(item => {
			if(item.type === Point) {
				console.log(item.props.x,item.props.y)
				this.ctx.lineTo(item.props.x, item.props.y)
				this.ctx.pos = {x: item.props.x, y: item.props.y}
			}
			if(item.type === Arc) {
				this.ctx.arc(this.ctx.pos.x,this.ctx.pos.y,item.props.r,item.props.from,item.props.to,false)
			}
			if(item.type === Move) {
				this.ctx.moveTo(item.props.x, item.props.y)
				this.ctx.pos = {x: item.props.x, y: item.props.y}
			}
		})
	  this.ctx.closePath();
	  this.ctx.stroke()
    return null
  }



}

const Point = () => null
const Arc = () => null
const Move = () => null
class Canvas extends Component {
  ctx = null
  state={
    ctx: null,
	  children:[]
  }
  static childContextTypes = {
    ctx: PropTypes.object
  }

  // 返回Context对象，方法名是约定好的
  getChildContext () {
    return {
      ctx: this.state.ctx
    }
  }

	componentWillUpdate(nextProps, nextState) {
		nextState.ctx.clearRect(0,0,500,500)
	}


	render () {
    return (
      <canvas ref='ctx'>
        {this.state.children}
        {/*{this.props.children}*/}
      </canvas>
    )
  }

	componentDidMount () {
    this.setState({
      ctx: this.refs.ctx.getContext('2d'),
      children: this.props.children
    })

  }
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
          {/*<Rect />*/}
	        <Path>
		        <Point name='line1' x={that.state.x} y={this.state.y}/>

		        <Point name='line2' x={100} y={100}/>
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
