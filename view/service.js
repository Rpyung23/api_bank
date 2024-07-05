const express = require('express')
const app = express()
const ServiceController = require('../controller/service.controller')
app.get('/type_service',async function(req,res)
{
    try {
        var data = await ServiceController.readTypeServiceController()
        if(data.error != undefined){
            res.status(500).json({msm:data.error})
        }else{
            res.status(data.response.length > 0 ? 200 : 204 ).json(data.response)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})


app.get('/listservice/:type',async function(req,res)
{
    try {
        var data = await ServiceController.readServiceController(req.params.type)
        if(data.error != undefined){
            res.status(500).json({msm:data.error})
        }else{
            res.status(data.response.length > 0 ? 200 : 204 ).json(data.response)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

module.exports = app