const express = require('express')
const {pool} = require("odbc");
const app = express()
const FirebaseController = require('../controller/firebase.controller')

app.post('/sendNotification',async function(req,res)
{
    try {
        var data = await FirebaseController.sendNotificationTokenController(req.body.token_firebase,'title','body')
        res.status(200).json({msm: data})
    }catch (e) {
        res.status(200).json({msm:e.toString()})
    }
})

module.exports = app