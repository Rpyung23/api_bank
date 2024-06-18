const express = require('express')
const  app = express()
const PingModel = require('../model/ping.model')
app.get('/ping',async function(req,res)
{
    try {
        var response = await PingModel.pingModel()
        res.status(200).json({'ping':response.data,'hostname':window.location.origin})
    }catch (e) {
        res.status(200).json({'ping':e.toString()})
    }
})

module.exports = app