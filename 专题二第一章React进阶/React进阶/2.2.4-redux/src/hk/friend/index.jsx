import React from 'react'
import { connect } from 'react-redux'

import { updateTitle, } from '../../actions/title'
import * as styles from './home.scss'
import { addFriend,delFriend} from '../../actions/friend'

class Friend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value:'a'
    }
  }

  render() {
    const {
      friendList
    } = this.props
    return (
      <div className={styles.wrap}>
        <input value={this.state.value} onChange={e => this.setState({value:e.target.value})}/><button onClick={(e) => addFriend(this.state.value)}>add</button>
        {
          friendList.map((item,index) => <p key={item.id}>{item.name}<button onClick={(e) => delFriend(item.id)}>-</button></p>)
        }
      </div >
    )
  }
}

export default connect((state) => {
  return {
    friendList: state.friend.list
  }
})(Friend)

