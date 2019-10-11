const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.get('/init', (req, res) => {
  res.send({
    'username': 'ryan',
    'country': 'cn',
    'lesson': 'react'
  })
})

app.listen(7777)


4 个 只
