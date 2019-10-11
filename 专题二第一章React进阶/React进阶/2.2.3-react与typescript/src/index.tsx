import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App3';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
 // create-react-app my-app --scripts-version=react-scripts-ts && cd my-app


//
// let str : string = 'a'
// let num : number = 2
//
// interface IPerson {
//   name: string;
//   age: number;
// }
//
// let personList : Array<IPerson> = [
//   {
//     name: 'ryan',
//     age:30
//   },
//   {
//     name: 'ryan1',
//     age:24
//   }
// ]
//
// interface ISumInterface {
//   (x:number,y:number): number
// }
//
// function sum(x: number,y: number){
//   return x + y
// }
//
// abstract class Animal {
//   public name:string
//   public age:number
//
//   public constructor(name:string,age:number) {
//     this.name = name
//     this.age = age
//   }
// }
//
// class Cat extends Animal {
//   public sayHi(): void{
//     console.log('hello')
//   }
// }
//
// let cat = new Cat('ryan',30)
// console.log(cat)
//
// console.log(str,num,personList,sum(1,2))
//
//
//
// interface Human {
//   run(): void
//   speak(): number
// }
//
//
// class Man implements Human{
//   run(){
//     console.log('run')
//   }
//   speak(){
//     console.log('1')
//     return 1
//   }
// }
