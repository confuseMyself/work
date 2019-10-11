import React from 'react'

class Hello extends React.Component{

  state = {
    num:1
  }

  render() {
    return (
      <div>
        <button onClick={e => {
          this.setState({
            num: this.state.num + 1
          })
        }}>add</button>
      </div>
    );
  }

}

export default Hello
