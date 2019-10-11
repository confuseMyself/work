import React from 'react'

class Hello extends React.Component{

  echo() {
    console.log('hello tttt')
    return 'echo'
  }

  render() {
    return (
      <div>
        hello
      </div>
    );
  }

}

export default Hello
