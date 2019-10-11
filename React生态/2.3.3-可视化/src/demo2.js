import React from 'react'

class Item extends React.Component {
  render () {
    return (
      <div>
        {this.props.value}
      </div>
    )
  }

  componentWillUpdate (nextProps, nextState) {
    console.log(this.props.value, 'update')
  }

  componentDidMount () {
    console.log(this.props.value, 'mount')
  }

  componentWillUnmount () {
    console.log(this.props.value, 'unmount')
  }
}
let key = [1,2,3,4]

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: ['a', 'b', 'c', 'd']
    }
  }
  render () {
    return (
      <div>
        {this.state.data.map((item,index) => <Item value={item} key={key[index]}/>)}
      </div>
    )
  }

  componentDidMount () {
    window.list = this
  }

}

export default List
