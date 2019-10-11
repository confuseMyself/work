// import * as React from 'react';
// import List from './todolist/list'
// import Action from './todolist/action'
// interface IProps {
//   name: string
// }
//
// interface IState {
//   value: string
// }
//
//
// class App extends React.Component<IProps,IState> {
//   public constructor(props: IProps){
//     super(props)
//     this.state = {
//       value:'a'
//     }
//   }
//   render() {
//     const {
//       name
//     } = this.props
//     const {
//       value
//     } = this.state
//     return (
//       <div>
//         {/*hello typescript {name} {value}*/}
//         {/*<input value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {*/}
//           {/*this.setState({*/}
//             {/*value: e.target.value*/}
//           {/*})*/}
//        {/*}}/>*/}
//         {/*<button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {*/}
//           {/*alert('hello')*/}
//         {/*}}>add</button>*/}
//         <List/>
//         <Action/>
//       </div>
//     );
//   }
//
//   public componentDidMount() {
//     console.log('hello')
//   }
//
// }
//
// export default App;
