import React,{Component,useEffect,PureComponent} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
export class AnimateList extends PureComponent{
	mounted = false
	static childContextTypes = {
		mountStyle: PropTypes.object,
		unMountStyle: PropTypes.object,
		parent: PropTypes.object,
	}
	getChildContext () {
		return {
			mountStyle: this.props.mountStyle,
			unMountStyle: this.props.unMountStyle,
			parent: this
		}
	}
	
	onUpdateOpen = (open) => {
		this.setState({open})
	}
	
	
	render() {
		return (
			<>
				{this.props.children}
			</>
		);
	}
}

export class AnimateItem extends PureComponent{
	static contextTypes = {
		mountStyle: PropTypes.object,
		unMountStyle: PropTypes.object,
		parent: PropTypes.object
	}
	render() {
		return (
			<>
				{this.props.children}
			</>
		);
	}
	
	
	run(index) {
		let dom = ReactDOM.findDOMNode(this)
		const {
			mountStyle,
			parent
		} = this.context
		dom.style.transition = parent.mounted ? '0.5s' : `0.5s ${index*0.2}s`
		parent.mounted = parent.props.children.length === index
		setTimeout(() => {
			for (let key in mountStyle)  {
				dom.style[key] = mountStyle[key]
			}
		},0)
	}
	componentDidMount() {
		const {
			index
		} = this.props
		let {
			parent
		} = this.context
		this.run(index)
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('did ypdate')
	}
	
	componentWillUnmount(a) {
		console.log(a)
	}
}