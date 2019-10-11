import React,{Component} from 'react'
import PropTypes from 'prop-types'
import '../../font-demo/iconfont.css'

/*
 <li class="dib">
            <span class="icon iconfont icon-jujia-beiru"></span>
            <div class="name">
              居家-被褥
            </div>
            <div class="code-name">.icon-jujia-beiru
            </div>
          </li>

          <li class="dib">
            <span class="icon iconfont icon-dianpu"></span>
            <div class="name">
              店铺
            </div>
            <div class="code-name">.icon-dianpu
            </div>
          </li>

          <li class="dib">
            <span class="icon iconfont icon-jiadian-dianfanguo"></span>
            <div class="name">
              家电-电饭锅
            </div>
            <div class="code-name">.icon-jiadian-dianfanguo
            </div>
          </li>

          <li class="dib">
            <span class="icon iconfont icon-meizhuang-ximiannai"></span>
            <div class="name">
              美妆-洗面奶
            </div>
            <div class="code-name">.icon-meizhuang-ximiannai
            </div>
          </li>


*/

class Icon extends Component{
	static propTypes = {
		name: PropTypes.string
	}

	static defaultProps = {
		name: 'aaa'
	}

	render() {
		const {
			name,
			...rest
		} = this.props
		return (
			<span {...rest} className={`icon iconfont icon-${name}`}></span>
		)
	}
}


export default Icon
