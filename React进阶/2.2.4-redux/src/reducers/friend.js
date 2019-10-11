import { ADD_FRIEND, DEL_FRIEND } from '../actions/friend'

const initialState = {
  list: [
    {
      name: 'ryan', id: 1
    },
    {
      name: 'xiao', id: 2
    }
  ]
}

export default (state = initialState, action = {}) => {
  const { type, data } = action
  let list = state.list
  switch (type) {
    case ADD_FRIEND:
      list = state.list
      list.push(data)
      return Object.assign({}, state, { list: [...list] })
    case DEL_FRIEND:
      list = list.filter(item => item.id !== data)
      return Object.assign({}, state, { list: [...list] })
    default:
      return state
  }
}
