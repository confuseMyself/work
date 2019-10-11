import React from 'react'
import { connect } from 'react-redux'

import { updateTitle } from '../../actions/title'
import * as styles from './home.scss'

class Home extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <img className={styles.logo} src={require('../../assets/logo.svg')} />
        <h2 onClick={() => updateTitle('hello world 2!')} className={styles.title}>{this.props.title}</h2>
      </div >
    )
  }
}

export default connect((state) => {
  return {
    title: state.title
  }
})(Home)

