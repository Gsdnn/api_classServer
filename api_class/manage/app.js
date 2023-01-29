const express = require("express")
const config = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('./model')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))

app.use(cors())
app.use(express.static((path.join(__dirname,'public'))))
app.use('/api',require('./router/index'))
app.use(require('./middleware/error'))

app.listen(config.app.port,()=>{
    console.log(`http://127.0.0.1:${config.app.port}/`)
})