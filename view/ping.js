const express = require('express')
const  app = express()
const PingModel = require('../model/ping.model')
const {getServerIP} = require('../util/server_util')
app.get('/ping',async function(req,res)
{
    try {
        var response = await PingModel.pingModel()
        res.status(200).json({'ping':response.data})
    }catch (e) {
        res.status(200).json({'ping':e.toString()})
    }
})

module.exports = app