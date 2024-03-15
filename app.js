require('./config/port')
const bodyParser = require('body-parser')
const express =  require('express')
const cors = require('cors')
const app = express()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const client = require('./view/client')
//const notification = require('./util/notification')
const account  = require('./view/account')
const transaction = require('./view/transaction')
app.use(client)
app.use(account)
app.use(transaction)

app.listen(process.env.PORT,function () {
    console.log(`SERVER API REST ${process.env.PORT}`)
})