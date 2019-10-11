import axios from 'axios'
import { createHashHistory } from 'history'
export const request = axios
request.defaults.baseURL = 'http://127.0.0.1:7777'
// request.defaults.withCredentials = true
request.interceptors.request.use((req) => {
  if (PRODUCTION) {
    console.log(req.method, ':', req.url)
  }
  return req
})
request.interceptors.response.use((res) => {
  console.log(res)
  console.group(res.config.method,res.config.url,res.status)
  console.log(res.data)
  console.groupEnd()
  return res.data
})

export const history = createHashHistory()
