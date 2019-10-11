import React from 'react'

class Hello extends React.Component{

  state = {
    value:'a'
  }

  render() {
    return (
      <div>
        <input onChange={e => {
          this.setState({value: 'cc'})
        }}>add</input>
      </div>
    );
  }

}

export default Hello
