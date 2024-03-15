const express = require('express')
const app = express()
const Jwt = require('../util/jwt')
const BankcreditController = require('../controller/bankcredit.controller')
app.get('/credit_bank',Jwt.checkJwt,async function(req,res)
{
    try {
        var data = await BankcreditController.readBankCreditController(req.body.code_id_client)
        if(data.error != undefined){
            res.status(200).json({msm:data.error.toString()})
        }else{
            res.status(200).json(data.data)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }

})

app.get('/detail_credit_bank/:id_credit',Jwt.checkJwt,async function(req,res)
{
    try {
        var data = await BankcreditController.readDetailBankCreditController(req.params.id_credit)
        if(data.error != undefined){
            res.status(200).json({msm:data.error.toString()})
        }else{
            res.status(200).json(data.data)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }

})


module.exports = app