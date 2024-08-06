require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
const TransactionController = require('../controller/transaction.controller')
const ClientController = require("../controller/client.controller");
const Jwt = require("../util/jwt");
const uuid  = require('uuid');
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


app.post('/PayPagoFacil',Jwt.checkJwt,async function (req,res)
{
    //console.log(req.body)
    try {
        var cajas = await ClientController.readCajaClientController(req.body.code_id_client,req.body.clien_cod_ofici)
        if(cajas.data.cajas_cod_cajas != undefined && cajas.data.cajas_cod_cajas > 0 )
        {
            var response = await axios.post(process.env.URLPAGOFAIL+"/pago",{
                uuid: req.body.uuid,
                datosFacturacion: req.body.datosFacturacion,
                rubro: req.body.rubro,
                datosAdicionales: {}
            },{headers:{ Authorization: `Bearer ${req.body.accesstoken}` }})

            if(response.status == 200 && response.data.success)
            {
                var responseTrans = await TransactionController.createTransactionPagoFacilController(req.body.clien_cod_empre,
                    req.body.clien_cod_ofici,cajas.data.cajas_cod_cajas,req.body.detail_service,
                    req.body.num_cuenta,req.body.rubro.valorTotal)

                console.log(`CODIGO TRANSFERENCIA ${responseTrans.data[0][""]}`)

                if(responseTrans.error != undefined){
                    // ELIMINAR EL COBRO YA REALIZADO
                    var responseReverso = await axios.post(process.env.URLPAGOFAIL+"/reverso",{
                        uuid: uuid.v4(),
                        idRubro: req.body.datosFacturacion,
                        valorTotal: req.body.rubro.valorTotal,
                    },{headers:{ Authorization: `Bearer ${req.body.accesstoken}` }})

                    return res.status(500).json({
                        message: 'No se ha podido realizar el débito del monto',
                        success: false,
                        resultCode: 0
                    })
                }
            }
            res.status(response.status).json(response.data)
        }else{
            res.status(500).json({
                message: 'No existen cajas disponibles',
                success: false,
                resultCode: 0
            })
        }

    }catch (e) {
        res.status(500).json({
            message: e.toString(),
            success: false,
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