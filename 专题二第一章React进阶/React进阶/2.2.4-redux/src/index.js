import React, { useReducer } from 'react'
import { render } from 'react-dom'
import Provider from 'react-redux/es/components/Provider'
import { store } from './store'
import App from './App'
const initialState = { count: 1 }

function reducer (state, action) {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state
  }
}

function Counter ({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
        Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>
          Reset
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}

render(
  <Counter />,
  document.getElementById('root')
)
