# 1、什么是jsx？
jsx 是react中JavaScript的一种扩展，是构建react UI界面的最小元素单元，通过babel 将jsx 转换成React.createElement()方法调用；
# 2、react 虚拟dom是什么？diff算法是什么？
虚拟dom实际上是把浏览器中的dom一一对应成一个JavaScript的对象，通过react render方法渲染成浏览器真是的dom

diff：计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面。 

key作用：react 通过key值来识别组件，应该是与组件一一对应的；

key的作用主要是用来减少没必要的diff算法对比，因为对于一个组件或者节点来说，只要父节点状态或者属性发生变化，该组件就会进行diff对比，即使该组件没变化，而如果为组件引入了key值，就可以在diff对比前先做一个校验，判断该组件是否需要diff对比，即使是diff对比，也可以判断该组件是直接更新操作还是销毁或者新建操作，从而提高了diff算法的效率； 

原理：因为在reactelement中有一个属性是key，该属性默认是为空值，所以一般情况下，只要组件不加上key值，react是不会去校验组件的key，而是直接采用diff算法进行对比，一旦组件加上了key值，react就会在渲染时对该组件的身份进行校验，首先校验新旧组件的key值是不是一致，不一致的话，该组件直接销毁，然后在新建该组件；如果一致，则比较组件的属性是否发生变化，如果发生变化，则采用diff算法进行对比，然后得出差异对象，如果属性没发生变化，则认为该组件不需要改变； 

流程图如下所示

![图片加载失败](https://github.com/confuseMyself/work/blob/master/react%20key%E4%BD%9C%E7%94%A8.png)



# 3、react 与vue 的异同点
### 不同点
1、vue使用的是模版语法，声明式的，类似与anglar，react使用的是jsx语法，all in js；
2、vue能监测到数据的变化，自动更新界面，而react不能感知数据的变化，通过setState方法重新调用render方法，来更新ui界面；
3、react中一切皆是组件，前端组件化框架，vue的组件实际上是mvvm的扩展，vue是mvvm框架
4、react是函数式编程
### 相同点
1、都是数据驱动，即数据的改变进而改变视图；
2、都支持组件化；
# 4、理解 React 组件的生命周期
react的生命周期分为三个部分：构建期，更新期，销毁期；
### 1、构建期：custructor，componentWillMount,shouldComponetUpdate,render,componentdidMounted,
### 2、更新期：componentWillRecieveProps,shouldComponetUpdate,componentWillUpdate,render,componentDidUpdate
### 3、销毁期：componentWillUnmounte,componentDidUnmounted

# 5、什么是Props？
父组件通过props向自组件传递信息；
# 6、React中的状态是什么？它是如何使用的？
react中的状态是state，在组件内通过this.state来调用状态；通过this.setState()来改变组件状态；
# 7、调用setState之后发生了什么？
调用setState之后，组件进入跟新的生命周期，shouldComponetUpdate,componentWillUpdate,render,componentDidUpdate
# 8、父子组件嵌套后的生命周期是怎样的？
### 1、构建期：父组件先执行render函数，子组件后执行；子组件先挂载，父组件后挂载；
### 2、更新期：？？？？？
### 3、销毁期：父组件先被销毁，然后销毁子组件；
# 9、react 上下文context ？
react 的上下文context是用于深层次嵌套的组件间的传值。
# 10、父子组件，跨级组件间通信，兄弟组件间通信的方法有哪些？
跨级组件间的通信：使用react context 上下文，观察者模式。
兄弟组件间的通信：使用观察者模式，通过共同的父组件来传递信息；
父子组件间的通信：父组件通过props向子组件传递信息，子组件通过调用父组件传过来的函数方法来向父组件传递信息；
所有的组件间的传递信息的方式，都可以用redux状态管理器来管理状态，使用redux来管理状态，会使项目复杂度增加，如果组件间不是频繁的通信，则建议不是用redux来管理状态。
# 11、reactDom 
### 1、为什么要在react中使用dom
react 是数据驱动，数据的变化来驱动UI视图的变化；在某些应用情况下，也需要向jQuery那样，直接操作dom。
### 2、在react中查找dom的方法：可以通过ref来查找dom；
### 3、ReactDOM.render(组件或者html, node)：渲染html或者组件到node节点下
### 4、ReactDOM.unmountComponentAtNode(node)：移除node节点下的组件。
# 12、react 与es6
### 1、对象和数组的结构赋值

```
// 对象和数组的结构赋值：原则：一一对应
let {
		name,
		lesson,
		teacher:{
			teacherName,
			age
		},
		skills:[vue1, react1,nodejs1,webpack1],
		friend:{
			name: friendName // 解决解构赋值里的命名冲突
		}
	} = {
		name: 'react & es6',
		lesson: '6',
		teacher:{
			teacherName:'ryan',
			age:30
		},
		skills:['vue','react','nodejs','webpack'],
		friend:{
			name:'aa'
		}
	}
```
### 2、... 在结构赋值中的应用

```
let {
		name,
		lesson,
		teacher:{
			teacherName,
			age
		},
		skills:[vue1, react1,nodejs1,webpack1],
		...rest // 把剩余的属性包裹成一个对象
	} = {
		name: 'react & es6',
		lesson: '6',
		teacher:{
			teacherName:'ryan',
			age:30
		},
		skills:['vue','react','nodejs','webpack'],
		friend:{
			name:'aa'
		},
		sex:"女"
	}
	console.log(rest) // {friend: {…}, sex: "女"}
```
### 3、类的继承extend
#### （1）、es6 的类的继承实际上是es5原型链的语法糖，实际上是把父类绑定到子类的原型对象上；
#### （2）、super可用作函数、对象使用；当用作函数时，只能在子类的构造函数中使用；当super在子类的静态方法当做对象调用时，super代表父类；当super在子类一般方法中当作对象使用时，super代表子类的prototype属性
### 4、proxy

```

let obj = new Proxy({
	a:10,
	b:20
}, {
	get: function (target,key,) {
		console.log('get ',key)
		return target[key] * 10
	},
	set: function (target,key,value) {
		return Reflect.set(target,key,value)
	}
})

```
# 12、es6 Proxy reflect
## 1、Proxy
proxy在目标对象的外层搭建了一层拦截，外界对目标对象的某些操作，必须通过这层拦截
## 2、reflect
reflect 新增的全局对象，里面包含了Object的一些方法
# 13、es7 装饰器 decorator
# 14、es6 Object.assign是ES6新添加的接口，主要的用途是用来合并多个JavaScript的对象。

```
var target  = {a : 1}; //目标对象
var source1 = {b : 2}; //源对象1
var source2 = {c : 3}; //源对象2
var source3 = {c : 4}; //源对象3，和source2中的对象有同名属性c
Object.assign(target,source1,source2,source3);
//结果如下：
//{a:1,b:2,c:4}

```
### 1、Object.assign是对象的合并
### 2、Object.assign是浅拷贝
# 15、redux,react-redux
## 1、redux三大核心：store、action、reducer
## 2、react-redux核心：connect函数，把redux和react联系起来，通过connect函数，把redux的store注入到react组件的props上
# 16、 mobx,react-mobx
## 1、mobx核心概念：Actions、State、Computed Value 、Reactions
在整个数据流中，通过事件驱动（UI 事件、网络请求…）触发 Actions，在 Actions 中修改了 State 中的值，这里的 State 既应用中的 store 树（存储数据），然后根据新的 State 中的数据计算出所需要的计算属性（computed values）值，最后响应（react）到 UI 视图层。
@action，其规定对于 store 对象中所有可观察状态属性的改变都应该在 @action 中完成，它使代码可以组织的更好，并且对于数据改变的时机也更加清晰。
通过 @observer 将 React 组件转化成响应式组件，它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件
## 2、 在 mobx 中，可以有很多种方式去修改 state，mobx 并不对其做限制，但是如果使用了严格模式
```
import { useStrict } from 'mobx';

useStrict(true);
```
那么将会限制开发者只能通过 @action 来修改 state，这将会更有利于组织代码以及使数据流更清晰。
# 17、 react hook 使用

```
import React, { useState, useEffect } from 'react';
const element = (props) => {
    const [data, setData] = useState(1)
    useEffect(() => {
        // componentDidMount
        // 直接使用return返回一个函数，这个函数在componentWillUnmount时执行
        return () => {
            console.log('will unmount');
        }
    }, []); // []相当于组件挂载完成,useEffect不带第二个参数，表示componentDidMount和componentDidUpdate都会执行
    return (
        <div className="page">

            {/* 相当于react setState({data:456}) */}
            {setData(456)}
        </div>
    );
}
```

# 18、react 受控组件和非受控组件

## 1、受控组件

在React中，每当表单的状态发生变化时，都会被写入到组件的state中，这种组件在React被称为**受控组件**。受控组件中，组件渲染的状态与它的value或者checked相对应 。

受控组件更新state流程： 

```
1. 可以通过在初始state中设置表单的默认值。
2. 每当表单的值发生变化时，调用onChange事件处理器。
3. 事件处理器通过合成事件对象e拿到改变后的状态，并更新state。
4. setState触发视图的重新渲染，完成表单组件值得更新。
```



## 2、非受控组件

表单的数据不受props，state的变化，通过ref来操作dom直接获取表单数据。

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    /**React 16.3版本后，使用此方法来创建ref。将其赋值给一个变量，通过ref挂载在dom节点或组件上，该ref的current属性将能拿到dom节点或组件的实例**/
    this.input = React.createRef(); 
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

# 19、react-dom 三个基本方法

## 1、ReactDOM.render

render用于将React渲染的虚拟DOM渲染到浏览器DOM，一般在顶层组件使用。该方法把元素挂载到 container 中，并且返回 element 的实例（即 refs 引用），如果是无状态组件，render 会返回 null。当组件装载完毕时，callback 就会被调用

```
import ReactDOM from 'react-dom';

ReactDOM.render(<Example />, document.getElementById('root'));
```

## 2、ReactDOM.findDOMNode 

findDOMNode用于获取真正的DOM元素，以便对DOM节点进行操作 ;

在此之前，首先要知道：在React中，虚拟DOM真正被添加到HTML中转变为真实DOM是在组件挂载（render()）后，故而我们可以在componentDidMount和componentDidUpdate这两个方法中获取。

 

```
import { findDOMNode } from 'react-dom';

<Example ref={ node=>{ this.node = node} }> // 利用ref获取Example组件的实例

const dom = findDOMNode(this.node); // 通过findDOMNode获取实例对应的真实DOM
```

 注意：当涉及复杂操作时，还有很多元素DOM API可用，然而DOM操作会对性能产生很大影响，所以，应当尽量减少DOM操作。 

## 3、unmountComponentAtNode

 unmountComponentAtNode用于执行卸载操作，执行在componentWillUnmount之前 



```
ReactDOM.unmountComponentAtNode(document.getElementByTagName('body'));// 把body下面的react元素卸载掉
```

 
