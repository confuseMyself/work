import React from 'react'

import * as styles from './about.scss'

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <p className={styles.blog}>说明文档</p>
      </div>
    )
  }
}