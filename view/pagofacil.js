require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()


app.get('/AuthPagoFacil',async function (req,res)
{
    //console.log(process.env.URLPAGOFAIL+"/auth/token")
    try {
        var response = await axios.post(process.env.URLPAGOFAIL+"/auth/token",{
            "idInstitucion": process.env.IDINSTITUCIONPAGOFACILAPP,
            "idAgencia": process.env.IDAGENCIAPAGOFACILAPP,
            "token": process.env.TOKENPAGOFACILAPP
        })
        res.status(response.status).json(response.data)
    }catch (e) {
        res.status(500).json({
            message: e.toString(),
            success: true,
            resultCode: 0
        })
    }

})


app.post('/ConsultaPagoFacil',async function (req,res)
{
    //console.log(req.body)
    try {
        var response = await axios.post(process.env.URLPAGOFAIL+"/consulta",{
            idInstitucion: process.env.IDINSTITUCIONPAGOFACILAPP,
            idAgencia: process.env.IDAGENCIAPAGOFACILAPP,
            uuid: req.body.uuid,
            referencia: req.body.referencia,
            idProducto: req.body.idProducto,
            datosAdicionales: {}
        },{headers:{ Authorization: `Bearer ${req.body.accesstoken}` }})
        console.log(response.status)
        if(response.status == 200){
            if(response.data.result != undefined){
                res.status(response.status).json(response.data.result)
            }else{
                res.status(500).json(response.data)
            }
        }else{
            res.status(response.status).json(response.data)
        }
    }catch (e) {
        res.status(500).json({
            message: e.toString(),
            success: true,
            resultCode: 0
        })
    }

})


app.post('/PayPagoFacil',async function (req,res)
{
    //console.log(req.body)
    try {
        var response = await axios.post(process.env.URLPAGOFAIL+"/pago",{
            uuid: req.body.uuid,
            datosFacturacion: req.body.datosFacturacion,
            rubro: req.body.rubro,
            datosAdicionales: {}
        },{headers:{ Authorization: `Bearer ${req.body.accesstoken}` }})

        res.status(response.status).json(response.data)
    }catch (e) {
        res.status(500).json({
            message: e.toString(),
            success: true,
            resultCode: 0
        })
    }

})


app.post('/InvoicePagoFacil',async function (req,res)
{
    //console.log(req.body)
    try {
        var response = await axios.post(process.env.URLPAGOFAIL+"/recibo",{
            idRubro: req.body.idRubro,
        },{headers:{ Authorization: `Bearer ${req.body.accesstoken}` }})

        if(response.status == 200){
            if(response.data.result != undefined){
                res.status(response.status).json(response.data.result)
            }else{
                res.status(response.status).json(response.data)
            }
        }else{
            res.status(response.status).json(response.data)
        }
    }catch (e) {
        res.status(500).json({
            message: e.toString(),
            success: true,
            resultCode: 0
        })
    }

})

module.exports = app