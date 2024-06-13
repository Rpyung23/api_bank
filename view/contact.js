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

app.get('/readnewdatacontactlocal/:account',Jwt.checkJwt,async function (req,res)
{
    try {
        var result = await ContactController.readNewDataContacLocalModel(req.params.account)
        if(result.error != undefined){
            res.status(500).json({msm:result.error})
        }else if(result.data.length > 0 ){
            res.status(200).json(result.data[0])
        }else{
            res.status(300).json({msm:"Cuenta no encontrada."})
        }
    }catch (e) {
        res.status(500).json({error:e.toString()})
    }
})

app.get('/checkAccountExist/:account',Jwt.checkJwt,async function(req,res)
{
    try {
        var data = await ContactController.checkExistContactController(req.body.code_usu_banca,req.params.account)
        //console.log(data)
        if(data.error != undefined){
            res.status(500).json({msm:data.error})
        }
        else{
            if(data.data > 0) {
                res.status(300).json({msm:'Número de cuenta ya registrado.'})
            }
            else if (data.data <=0 ){
                res.status(200).json({msm:'Cuenta Disponible'})
            }
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})


app.post('/createContactLocal',Jwt.checkJwt,async function(req,res){
    try {
        var response = await ContactController.createContactLocalController(req.body.code_usu_banca,
            req.body.account,req.body.name,req.body.codeContact)
        if (response.error != undefined){
            res.status(500).json({msm:response.error})
        }else {
            res.status(200).json({msm:'Contacto creado con exito'})
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

app.post('/createContactExternal',Jwt.checkJwt,async function(req,res){
    try {
        var response = await ContactController.createContactExternalController(req.body.code_usu_banca,
            req.body.account,req.body.typeaccount,
            req.body.ifina_cod_ifina, req.body.name,
            req.body.codecontact,req.body.typecodecontact,
            req.body.email)
        if (response.error != undefined){
            res.status(500).json({msm:response.error})
        }else {
            res.status( response.data ? 200 : 300).json({msm:response.data ? 'Contacto creado con exito' : 'El contacto ya se encuentra registrado'})
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

module.exports = app