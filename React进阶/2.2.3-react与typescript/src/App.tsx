import * as React from 'react';
import './App.css';
import Action from './views/action';
import List from './views/list';


import {
  StudentItem
} from './interface'



let a:string = '1'
console.log(a)

export interface IState {
  value: string,
  list: Array<StudentItem>
}

class App extends React.Component<Object,IState> {
  public state = {
    value: '',
    list: [
      {name: 'ryan',age:30}
    ]
  }

  public render() {
    const {
      list,
      value
    } = this.state
    return (
      <div className="App">
        <Action
          onChange={(v) => {
          this.setState({
            value: v
          })
        }} value={value} onAdd={(value: string) => {
          list.push({
            name: value,
            age: 10
          })
          this.setState({
            list,
            value:''
          })
        }}/>
        <List list={this.state.list} onDel={(index:number) => {
          console.log(index)
        }}/>

      </div>
    );
  }
}

export default App;
