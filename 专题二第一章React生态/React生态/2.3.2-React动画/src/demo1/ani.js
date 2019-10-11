import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

export class AnimateList extends React.Component{
	mounted = false
	static childContextTypes = {
		mountStyle: PropTypes.object,
		unMountStyle: PropTypes.object,
		parent: PropTypes.object,
		remove: PropTypes.object
	}

	getChildContext () {
		return {
			mountStyle: this.props.mountStyle,
			unMountStyle: this.props.unMountStyle,
			parent: this,
			remove: this.props.remove
		}
	}

	render() {
		return (
			<>
				{this.props.children}
			</>
		);
	}
}

export class AnimateItem extends React.Component{
	static contextTypes = {
		mountStyle: PropTypes.object,
		unMountStyle: PropTypes.object,
		parent: PropTypes.object,
		remove: PropTypes.object
	}
	unMountAnimation = () => {

	}
	remove = (index) => {
		const {
			unMountStyle
		} = this.context
		let dom = ReactDOM.findDOMNode(this)
		let move = () => {
			this.context.remove(index)
		}
		// 监听过渡动画事件；
		dom.addEventListener('transitionend', move ,false)
		// 添加移除的过渡效果
		for (let key in unMountStyle)  {
			dom.style[key] = unMountStyle[key]
		}
	}
	render() {
		let {
			render
		} = this.props

		return (
			<>
				{render(this.remove)}
				{/*{this.props.children}*/}
			</>
		);
	}

	run(index) {
		const {
			mountStyle,
			parent
		} = this.context

		let dom = ReactDOM.findDOMNode(this);
		// 子组件挂载完成之后父组件才执行componentDidMount方法；
		dom.style.transition = parent.mounted ? '0.5s' : `0.5s ${index*0.2}s`
		parent.mounted = parent.props.children.length === index
		setTimeout(() => {
			for (let key in mountStyle)  {
				dom.style[key] = mountStyle[key]
			}
		}, 0)
	}

	componentDidMount() {
		const {
			index
		} = this.props
		this.run(index)
	}

}

