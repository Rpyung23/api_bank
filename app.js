require('./config/port')
const bodyParser = require('body-parser')
const express =  require('express')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



const client = require('./view/client')

app.use(client)

app.listen(process.env.PORT,function () {
    console.log(`SERVER API REST ${process.env.PORT}`)
})