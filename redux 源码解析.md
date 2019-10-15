redux源码解析 

一、createStore 源码解析
createStore(reducer, preloadedState, enhancer)
	reducer通过combineReducers，把所有的reducer结合成一个对象；
	preloadedState：reducer的初始值
	enhancer是store 的增强器函数，可以指定为中间件，持久化 等，但是这个函数只能用 Redux 提供的 applyMiddleware 函数来进行生成；
function createStore(reducer, preloadedState, enhancer){
	// .....
    if (typeof enhancer !== 'undefined') {
		if (typeof enhancer !== 'function') {
		  throw new Error('Expected the enhancer to be a function.')
		}
		//enhancer 接受 createStore 作为参数，对  createStore 的能力进行增强，并返回增强后的  createStore 。
		//  然后再将  reducer 和  preloadedState 作为参数传给增强后的  createStore ，最终得到生成的 store
		return enhancer(createStore)(reducer, preloadedState)
  }
	// 分发action
  function dispatch(action) {
    ......
  }
    // 返回state
  function getState() {
    if (isDispatching) {
      throw new Error(
        ......
      )
    }
    return currentState
  }

  // 添加订阅
  function subscribe(listener) {
  ......
    }
  }
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }

}
二、compose
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  利用compose生成组合函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
compose(funcA, funcB, funcC) 等价于 compose(funcA(funcB(funcC())))

三、applyMiddleware 三级柯里化函数

function applyMiddleware(...middlewares) {

  return createStore => (...args) => {
  
    // 利用传入的createStore和reducer和创建一个store
    const store = createStore(...args)
	
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
applyMiddleware(...middlewares) 

等价于 
缓存的参数有：middlewares，args即reducer
createStore => (...args) => {
  
    // 利用传入的createStore和reducer和创建一个store
    const store = createStore(...args)
	
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)// ？
    }
    // 让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
	
	// 等价于 dispatch = f1(f2(f3(store.dispatch))))
	// 包装dispatch，返回新的dispatch
	// return compose(funcA(funcB(funcC(store.dispatch))))
    dispatch = compose(...chain)(store.dispatch)
	
	
	返回新的store 和经过包装的新的dispatch
    return {
      ...store,
      dispatch
    }
  }

  
let store = createStore(
  combineReducers({...home}),// 把所有的reducer汇聚到一起
  applyMiddleware(thunk) // 添加中间件，当dispatch时会执行先中间件
);
执行这个函数
 enhancer(createStore)(reducer, preloadedState)
 
 
 
// thunk中间件
// extraArgument === {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)// ？
    }
function createThunkMiddleware(extraArgument) {

  return ({ dispatch, getState }) => next => action => {
    // 如果是函数，就执行函数
    if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
    }
    // 如果不是，执行下一个中间件
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;


// middleware 等价于下面的函数
function ({ dispatch, getState }){
    // next === store.dispatch;
	return function(next){
		return function(action){
			// 如果是函数，就执行函数
			if (typeof action === 'function') {
				return action(dispatch, getState, extraArgument);
			}
			// 如果不是，执行下一个中间件
			return next(action);
		}
	}
}
// middleware(middlewareAPI) 等价于下面的函数
function (next){
	// next === redux原始的dispatch、next指向下一个要执行的(action) => {}匿名函数
	return function(action){
		// 如果是函数，就执行函数
		if (typeof action === 'function') {
			return action(dispatch, getState, extraArgument);
		}
		// 如果不是，执行下一个中间件
		return next(action);
	}
}
// funcC(store.dispatch) 等价于下面的函数
function(action){
	// 如果是函数，就执行函数
	if (typeof action === 'function') {
		return action(dispatch, getState, extraArgument);
	}
	// 如果不是，执行下一个中间件
	return next(action);
}



// getState获取当前state的状态
function mid1({ getState }) {
// next指向下一个要执行的(action) => {}匿名函数
  return (next) => {
  // action是指dispatch中的对象
    return (action) => {
      console.log('start mid1')
      next(action)
      console.log('end mid1');
    }
  }
}
// getState获取当前state的状态
function mid2({ getState }) {
// next指向下一个要执行的(action) => {}匿名函数
  return (next) => {
  // action是指dispatch中的对象
    return (action) => {
      console.log('start mid2')
      next(action)
      console.log('end mid2');
    }
  }
}
// getState获取当前state的状态
function mid3({ getState }) {
// next是redux store里面的原生dispatch方法
  return (next) => {
    // action是指dispatch中的对象
    return (action) => {
      console.log('start mid3')
      next(action)
      console.log('getState() :', getState());
      console.log('end mid3');
    }
  }
}




























