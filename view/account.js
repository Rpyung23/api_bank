const Jwt = require('../util/jwt')
const express = require('express')
const app = express()
const AccountController = require('../controller/account.controller')

app.get('/read_accounts',Jwt.checkJwt,async function(req,res)
{
    try {
        var data = await AccountController.readAccountClientController(req.body.code_id_client)
        //console.log(data.data)
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