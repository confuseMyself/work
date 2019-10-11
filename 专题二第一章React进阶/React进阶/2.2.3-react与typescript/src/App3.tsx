import * as React from 'react';
import List from './todolist/list'
import Action from './todolist/action'
import {
  FriendItem
} from './todolist/types'

interface IState {
  value: string,
  list: Array<FriendItem>
}


class App extends React.Component<Object,IState> {
  public constructor(props: Object){
    super(props)
    this.state = {
      value:'a',
      list: [
        {
          name: 'ryan',age:30,id:1
        },
        {
          name: 'react',age:4,id:2
        },
        {
          name: 'vue',age:3,id:3
        }
      ]
    }
  }
  render() {
    const {
      value,
      list
    } = this.state
    return (
      <div>
        <List list={list} onDel={(index:number) =>{
          console.log(index)
          list.splice(index,1)
          this.setState({
            list
          })
        }}/>
        <Action value={value} onChange={(value: string) => {
          this.setState({
            value
          })
        }} onAdd={(value:string) => {
          list.push({
            name:value,
            age:10,
            id:4
          })
          this.setState({
            list,
            value:''
          })
        }}/>
      </div>
    );
  }

  public componentDidMount() {
    console.log('hello')
  }

}

export default App;
