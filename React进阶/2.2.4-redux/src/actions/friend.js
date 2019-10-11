import { store } from '../store'

export const ADD_FRIEND = 'ADD_FRIEND'

export function addFriend (data) {
  const dispatch = store.dispatch
  // dispatch({ type: ADD_FRIEND, data })
  // request.post("/addFriend",{name}).then(res => {
  //   dispatch({ type: ADD_FRIEND, data })
  // })
  setTimeout(() => {
    dispatch({ type: ADD_FRIEND, data: { name: 'time-friend', id: 3 } })
  }, 200)
}

export const DEL_FRIEND = 'DEL_FRIEND'

export function delFriend (id) {
  const dispatch = store.dispatch
  dispatch({ type: DEL_FRIEND, data: id })
}
