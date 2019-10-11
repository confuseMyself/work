import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './index.scss'
class Button extends Component{
	static propTypes = {
		icon: PropTypes.string,
		type: PropTypes.string
	}

	static defaultProps = {
		icon: 'dianpu',
		type: 'primary'
	}

	render() {
		const {
			icon,
			children,
			type,
			...rest
		} = this.props
		return (
			<button className={`react-ui__btn--${type}`}>
				<Icon name={icon}/>
				{children}
			</button>
		)
	}
}


export default Button

