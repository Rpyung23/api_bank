const express = require('express')
const app = express()
const Jwt = require('../util/jwt')
const TransactionController =  require('../controller/transaction.controller')
app.get('/last_transaction/:account',Jwt.checkJwt,async function(req,res)
{
    try {
        var data = await TransactionController.readLastTransactionClientController(req.params.account)
        if(data.error != undefined){
            res.status(500).json({msm:data.error})
        }else{
            res.status(200).json(data.data)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

module.exports = app