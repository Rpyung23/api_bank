const express = require('express')
const app = express()
const Jwt = require('../util/jwt')
const TransactionController =  require('../controller/transaction.controller')
const ClientController = require('../controller/client.controller')
const {getFechaHoraActual,getFechaActual} = require("../util/fechaFormat");
const Notification = require('../util/notification')
const  {htmlTransfer} = require('../util/htmlContent')
app.get('/last_transaction/:account',Jwt.checkJwt,async function(req,res)
{
    try {
        var data = await TransactionController.readLastTransactionClientController(req.params.account)
        if(data.error != undefined){
            res.status(500).json({msm:data.error})
        }else{
            res.status(200).json(data.data)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

app.post('/create_transaction_local',Jwt.checkJwt,async function(req,res)
{
    try {
        var cajas = await ClientController.readCajaClientController(req.body.code_id_client,req.body.clien_cod_ofici)
        //console.log(req.body)
        if(cajas.data.cajas_cod_cajas != undefined && cajas.data.cajas_cod_cajas > 0 )
        {
            var response = await TransactionController.createTransactionCLientLocalController(req.body.clien_cod_empre,
                req.body.clien_cod_ofici,cajas.data.cajas_cod_cajas,req.body.detail,
                req.body.account_origin,req.body.account_destination,req.body.valtrans);
            //console.log("paso rsponse")
            if(response.error != undefined) {
                //console.log("ingreso error")
                res.status(500).json({code_transaction: response.error})
            }else {

                try {
                    Notification.sentNotificationEmail(req.body.code_dni_client,req.body.code_id_client,
                        'COMPROBANTE DE TRANSFERENCIA',htmlTransfer((req.body.clien_nom_clien+" "+req.body.clien_ape_clien),
                            req.body.account_origin,req.body.valtrans,req.body.name_clien_dest,
                            req.body.account_destination,req.body.detail,response.data[0][""]))
                }catch (e) {
                    console.log(`ERROR NOTIFICATION ${e.toString()}`)
                }

                res.status(200).json({code_transaction:response.data[0][""]})
            }
        }else{
            res.status(200).json({msm:"NO SE ENCONTRARON CAJAS HABILITADAS EN LA OFICINA ASIGNADA"})
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})


app.post('/create_transaction_external',Jwt.checkJwt,async function(req,res)
{
    try {
        var cajas = await ClientController.readCajaClientController(req.body.code_id_client,req.body.clien_cod_ofici)
        //console.log(req.body)
        if(cajas.data.cajas_cod_cajas != undefined && cajas.data.cajas_cod_cajas > 0 )
        {
            var response = await TransactionController
                .createTransactionClientExternalController(req.body.clien_cod_empre,req.body.clien_cod_ofici,
                    cajas.data.cajas_cod_cajas,req.body.clien_cod_empre, req.body.clien_cod_ofici,req.body.code_id_client,
                    req.body.code_dni_client,(req.body.clien_nom_clien+" "+req.body.clien_ape_clien),req.body.account_origin,req.body.valtrans,
                    req.body.id_clien_dest,req.body.name_clien_dest,req.body.codofi,req.body.account_des,req.body.type_account,req.body.detail)

            if(response.error != undefined) {
                res.status(500).json({msm: response.error})
            }else {
                try {
                    Notification.sentNotificationEmail(req.body.code_dni_client,req.body.code_id_client,
                        'COMPROBANTE DE TRANSFERENCIA',htmlTransfer((req.body.clien_nom_clien+" "+req.body.clien_ape_clien),
                            req.body.account_origin,req.body.valtrans,req.body.name_clien_dest,
                            req.body.account_des,req.body.detail,response.data[0][""]))
                }catch (e) {
                    console.log(`ERROR NOTIFICARION TRANSFER ${e.toString()}`)
                }

                res.status(200).json({code_transaction:response.data[0][""]
                })
            }
        }else{
            res.status(200).json({msm:"NO SE ENCONTRARON CAJAS HABILITADAS EN LA OFICINA ASIGNADA"})
        }
    }catch (e) {
        res.status(200).json({msm:e.toString()})
    }
})


app.get('/read_transaction/:account/:code',Jwt.checkJwt,async function(req,res)
{
    try {
        var data = await TransactionController.readTransactionLocalClientController(req.params.account,req.params.code)
        if(data.error != undefined){
            res.status(500).json({msm:data.error})
        }else{
            res.status(200).json(data.data[0])
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})


module.exports = app