import request from 'axios'

request.interceptors.request.use(req => {
  console.group(req.method, ':', req.url)
  return req
})

request.interceptors.response.use(res => {
  if (res.data.status === '401') {
    location.href = '/login'
    return
  }
  return res
})

const getInitialData = params => request.get('/getInitialData', { params })
