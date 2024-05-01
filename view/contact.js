const express = require('express')
const app = express()
const Jwt = require('../util/jwt')
const ContactController = require('../controller/contact.controller')
app.get('/contacts',Jwt.checkJwt,async function (req, res)
{
    try {
        var result = await ContactController.readMyContactController(req.body.code_usu_banca)
        if(result.error != undefined){
            res.status(500).json({error:result.error})
        }else {
            res.status(200).json(result.data)
        }
    }catch (e) {
        res.status(500).json({error:e.toString()})
    }
})

app.get('/checkcontact/:account',Jwt.checkJwt,async function (req,res)
{
    try {
        var result = await ContactController.checkContacController(req.params.account)
        if(result.error != undefined){
            res.status(200).json({error:result.error})
        }else {
            res.status(200).json(result.data)
        }
    }catch (e) {
        res.status(500).json({error:e.toString()})
    }
})

module.exports = app