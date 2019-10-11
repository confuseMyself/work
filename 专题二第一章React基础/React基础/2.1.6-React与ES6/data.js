let express = require('express')
let cors = require('cors')
let app = express()
app.use(cors())
app.get('/api',(req,res) => {
  res.json({
    status:200,
    data:[
      {name:1,age:1,sex:1},
	    {name:2,age:2,sex:2},
	    {name:3,age:3,sex:3},
    ]
  })
})

app.listen(7777)
