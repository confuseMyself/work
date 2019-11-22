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
**1、react 的上下文context是用于深层次嵌套的组件间的传值。**

**2、react context 使用**

老版本的context 

getChildContext 根组件中声明，一个函数，返回一个对象，就是context
childContextTypes 根组件中声明，指定context的结构类型，如不指定，会产生错误
contextTypes 子孙组件中声明，指定要接收的context的结构类型，可以只是context的一部分结构。contextTypes 没有定义，context将是一个空对象。
this.context 在子孙组件中通过此来获取上下文
(注:从React v15.5开始 ，React.PropTypes 助手函数已被弃用，可使用 prop-types 库 来定义contextTypes)

举例如下：

```

import React from "react";
import PropTypes from 'prop-types'
class Provider extends React.Component{
    // 根组件中声明，纯函数，返回一个对象，就是context
	getChildContext () {
		return this.props.store
	}
	// 声明Context对象属性，如不声明，会产生错误
	static childContextTypes = {
		name: PropTypes.string,
		age: PropTypes.number
	}
	constructor(props){
		super(props)
		this.state = {
			name: 'provider-user'
		}
	}
	render() {
		return this.props.children
	}
}

class BaseUser extends React.Component{
	render() {
		return (
			<div>
				{this.props.name}
			</div>
		);
	}
}
class BasePost extends React.Component{
	render() {
		return (
			<div>
				{this.props.age}
			</div>
		);
	}
}
// 高阶组件  属性代理
const connect = (Com) => {
	class ConnectComponent extends React.Component {
		// 声明需要使用的Context属性
		// 声明之后可以直接使用this.context访问
		static contextTypes = Provider.childContextTypes
		displayName = Com.displayName
		render() {
			return (
				<Com {...this.context}/>
			);
		}
	}
	return ConnectComponent
}


const User = connect(BaseUser)
const Post = connect(BasePost)
const store = {
	name: 'ryan',
	age:10
}



class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<User/>
					<Post/>
				</div>
			</Provider>
		);
	}
}

export default App

```

**2、react 新的context api，生产-消费者模式，避免了ShouldComponentUpdate的冲突** 

新版本的React context使用了Provider和Customer模式，和react-redux的模式非常像。在顶层的Provider中传入value， 在子孙级的Consumer中获取该值，并且能够传递函数，用来修改context，如下代码所示： 

```
import React from 'react';
import ReactDOM from 'react-dom';

// 创建context实例，生产-消费者模式
// context 新的api 生产-消费模式 避免了ShouldComponentUpdate的冲突 
const ThemeContext = React.createContext({
  background: 'red',
  color: 'white',
  func: function () {}
});

class Header extends React.Component {
  render() {
    return (
      <Title>
        撒旦法所发生的发生的发生的
      </Title>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      // 消费者
      <ThemeContext.Consumer>
        {context => (
          <h1 style={{ background: context.background, color: context.color }}>
            <button onClick={()=>{context.func("aasdfas")}}>点击向祖父传值</button>
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      background: "red",
      color: "green",
      buttonContent:"点击换肤",
    }
  }
  clickButton = () => {
    this.setState({
      background: "yellow",
      color: "red"
    })
  }
  passData = (name,...rest) => {
    this.setState({
      buttonContent:name
    })
  }
  render() {
    let { background, color,buttonContent } = this.state;
    return (
      <div className="App">
        <button className="App__button"
          onClick={this.clickButton}
        >{buttonContent}</button>
        {/* 生产者 */}
        <ThemeContext.Provider value={{ background: background, color: color, func: this.passData }}>
          <Header />
        </ThemeContext.Provider>
      </div>

    );
  }
}
export default App
```

3、context在如下的生命周期钩子中可以使用

constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
componentDidUpdate(prevProps, prevState, prevContext)

4、 在无状态组件中可以通过参数传入

```
function D(props, context) {
  return (
    <div>{this.context.user.name}</div>
  );
}

D.contextTypes = {
  user: React.PropTypes.object.isRequired
}
```

5、react16.8版本的context详细使用文档的链接

[react16.8版本的context使用链接]: https://react.docschina.org/docs/context.html#reactcreatecontext

6、新版context使用的一些注意事项

- 当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。 
- 每个组件可以消费多个context，为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。 

```
class 定义的组件消费多个context
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

// 函数式组件消费多个context
// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

- Context 主要应用场景在于*很多*不同层级的组件需要访问同样一些的数据 
- 使用 context, 我们可以避免通过中间元素传递 props： 

```
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```



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

装饰器可以对类、类的属性进行装饰，不能对函数装饰

```
import React from 'react'

// 装饰器可以对类、类的属性进行修饰
// target表示类，key表示类的属性，descriptor表示类的属性的值
function decorateArmour(target, key, descriptor) {
  const method = descriptor.value;
  let moreDef = 100;
  let ret;
  descriptor.value = (...args) => {
    args[0] += moreDef;
    ret = method.apply(target, args);
    return ret;
  }
  return descriptor;
}

class Man extends React.Component {
  constructor(def = 2, atk = 3, hp = 3) {
    this.init(def, atk, hp);
  }

  @decorateArmour
  init(def, atk, hp) {
    this.def = def; // 防御值
    this.atk = atk;  // 攻击力
    this.hp = hp;  // 血量
  }
  toString() {
    return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
  }
  render() {
    <div>
      asdfa
    </div>
  }
}

export default Man
```



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
    this.input = React.createRef(); // 也可以用uesRef这个hook来创建
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

#  20、react hook使用

hook是react16.8的新增特性，它可以让你在不编写class的情况下使用state以及其它react特性

## 1、react hook 类型

state hook、effect hook 、context hook、ref hook 自定义hook 等

## 2、hook的使用规则

只能在最顶层使用hook：**不要在循环，条件或嵌套函数中调用 Hook** ，因为React 靠的是 Hook 调用的顺序。 

只在react函数式组件中调用hook

## 3、自定义hook使用

### 1、自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

```
import React, { useState, useEffect } from 'react';
// 自定义hook
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
// 使用自定义hook
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

### 2、自定义hook必须以use开头，不以use开头，react将无法判断自定义hook里是否包含了其内部的hook调用。

### 3、在两个组件中使用相同的hook不会共享state，因为自定义hook是重用状态逻辑的机制，其实自定义hook是一个具有返回值的纯函数，返回的其实是不同的值，因此不会共享state

4、useState hook 在第一挂载时，会保存初始设置的状态，在组件更新时，useEffect会重新执行react函数式组件定义的函数，会根据useEffect的参数来决定执行挂载后，更新后执行，但是更新的时候，组件的状态是会保存最初挂载时设置的状态，只用通过setData函数来更改，组件的状态才会改变

# 21、react 高阶函数

1、高阶函数本质就是一个函数，该函数接受一个组件作为参数，并返回一个新的组件。

我们需要一个抽象，允许我们在一个地方定义逻辑，并在许多组件之间共享它。这正是高阶组件擅长的地方。

优点：HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件*包装*在容器组件中来*组成*新组件。HOC 是纯函数，没有副作用。

2、属性代理：高阶组件通过被包裹的react组件来操纵props，其实就是js面向对象编程里的一个模式，代理模式，核心功能由核心组件组件编写，要给这个组件添加其它功能时，通过代理模式，react中的高阶组件模式，组合出一个新的组件，包含核心功能和新添加的功能，这样可以在不更改核心组件的前提下增加新的功能。

3、反向继承：高阶组件继承于被包裹的组件

```
import React,{Component} from "react";
 
// 用于预先 将业务组件，进行数据的封装，便于我们 方便获取数据
// 反向继承 交互的封装，
const loading = Com  => {
	class LoadingComponent extends Com {
		
		showLoading(){
			console.log('loading')
		}
		hideLoading(){
			console.log('hide')
		}
	}
	return LoadingComponent
}
 
 
 
@loading // 装饰器的使用，是在运行是调用，反向继承，返回一个新的组件
class User extends Component{
	render() {
		return <div>user</div>
	}
 
	componentDidMount() {
		this.showLoading()
		//http
		this.hideLoading()
	}
}
 
class App extends Component{
	render() {
		return <User/>
	}
}
export default App 
```

# 22、react 16新的生命周期

- 创建期：constructor->getDerivedStateFromProps->render->react更新dom和refs->componentDidMount
- 更新期：在new props 、setState()、forceUpdate()：getDerivedStateFromProps=》shouldComponentUpdate=》render=》getSnapshotBeforeUpdate=》react更新dom和refs=》componentDidUpdate
- 卸载时：componentWillUnmount

```
import React, { Component } from 'react';
import './index.less';
export default class element extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    // 类的静态函数，不能在静态函数里调用this
    // 1、构建组件时,在constructor之后调用；2、setState之后会被调用；3、接受到新的props会调用
    // return 之后的obj表示更新state，但是此时state还未改变，
    // 如果使用setState()直接更改state状态，此时的prevState === setstate之后的state
    static getDerivedStateFromProps(nextProps, prevState) {
        return null
    }
    // 在更新期调用
    // 通过getDerivedStateFromProps return改变的state，此时的state还未改变
    // 但是通过setState()直接更改state状态，nextState === setstate之后的state
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    //在render函数之后，componentDidUpdate之前调用，此时state已经改变
    //return 之后的数据将作为第三个参数传递给被componentDidUpdate接收到
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return null
    }
    // 在render函数之后调用,该生命周期不经常调用，主要是用于更新后的某些操作
    componentDidUpdate(prevProps, prevState, data) {
    }
    // 组件挂载完成时调用，在整个生命周期只调用一次
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    // 此时的state,props已改变
    render() {
        return (
            <div className="page">

            </div>
        );
    }
}
```

