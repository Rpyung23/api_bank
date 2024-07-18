const express = require('express')
const app = express()
const Jwt = require('../util/jwt')
const InvestmentController = require('../controller/investment.controller')
app.get('/investment',Jwt.checkJwt,async function(req,res)
{
    try {
        var response = await InvestmentController.readInvestmentController(req.body.code_id_client)
        res.status(200).json(response)
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})


module.exports = app