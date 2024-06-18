require('dotenv').config()
const AWS = require('aws-sdk')
const multer = require('multer');
const upload = multer();
const express = require('express')
const app = express()
const ClientController = require('../controller/client.controller')
const Jwt = require('../util/jwt')
const checkPassword = require("../util/checkPassword");
const Notification = require('../util/notification')
const {getFechaHoraActual} = require('../util/fechaFormat')
const {htmlLogin} = require('../util/htmlContent')

//Inicializamos la instancia de AWS Rekognition
// b*D09-Bl
// AKIAW4FQIU6WGFAJALUR
// 6TClfrUQJ7jF3XWs95Hoy/R6Ntl5mZgs+GHWx34/

AWS.config.update({
    accessKeyId: "AKIAW4FQIU6WGFAJALUR",
    secretAccessKey: '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',
    region: 'us-east-2',
    apiVersion: '2016-06-27'
})

app.get('/profile_client',Jwt.checkJwt,async function(req,res)
{
    try {
        var data = await ClientController.readProfileClientController(req.body.code_id_client)

        if(data == null){
            res.status(500).json({msm:"PERFIL NO ENCONTRADO"})
        }else{
            res.status(200).json(data)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

app.post('/login_client',async function(req,res)
{
    try{

        var data = await ClientController.loginClientController(req.body.usuario,req.body.password)
        if(data.data[0] == undefined){
            return res.status(204).json({
                msm:'SUS CREDENCIALES SON INCORRECTAS.'
            })
        }
        //console.log(data.data[0])
        var jwt = data.data.length > 0 ? Jwt.createJWT(data.data[0]) : null

        if(data.data[0].imei_ult_ingreso != null && data.data[0].imei_ult_ingreso != undefined)
        {
            if(data.data[0].imei_ult_ingreso != req.body.imeiaccess)
            {
                return res.status(500).json({ msm : "NO PUEDE INICIAR SESIÓN EN LA APLICACIÓN PORQUE YA ESTÁ ABIERTA EN OTRO DISPOSITIVO. POR FAVOR, CIERRA LA SESIÓN EN EL OTRO DISPOSITIVO PARA PODER ACCEDER AQUÍ."})
            }
        }

        if(jwt != null)
        {
            var isvalidatePass = req.body.isLocalAuth  ? true : await checkPassword(req.body.password,data.data[0].contrasenia_banca)

            if(!isvalidatePass)
            {
                res.status(401).json({
                    msm:"SU CONTRASEÑA NO ES CORRECTA."
                })

            }else{
                //console.log(req.body.ipaccess)
                try {
                    Notification.sentNotificationEmail(data.data[0].clien_ide_clien,data.data[0].clien_cod_clien,
                        'INGRESO BANCA VIRTUAL MOVIL',htmlLogin(req.body.ipaccess,getFechaHoraActual()))
                }catch (e) {
                    console.log(`ERROR NOTIFICATION LOGIN ${e.toString()}`)
                }

                res.status(200).json({
                    token:jwt,
                    username:data.data[0].pk_usuario_banca,
                    first_name:data.data[0].clien_nom_clien,
                    last_name:data.data[0].clien_ape_clien,
                    welcome_msm: data.data[0].welcome_msm,
                })
            }
        } else{
            res.status(401).json({
                msm:'NO SE PUEDO CREAR TOKEN DE ACCESO'
            })
        }

    }catch (e) {
        //console.log(e)
        res.status(500).json({msm:e.toString()})
    }
})

app.delete('/logout_client',async function(req,res)
{
    //console.log("PING LOGIN CLIENT")
    //console.log(req.body)
    try{

        var data = await ClientController.logOutClientModel(req.body.usuario)
        if(data.error != undefined){
            res.status(500).json({msm:data.error})
        }else{
            res.status(200).json({msm:"ok"})
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

app.post('/check_face_id',upload.fields([{ name: 'dni_picture', maxCount: 1 }, { name: 'face_picture', maxCount: 1 }]),async function(req,res)
{
    const file_dni_picture  = req.files['dni_picture'][0]
    const file_face_picture  = req.files['face_picture'][0]

    if(!file_dni_picture || !file_face_picture) {
        return res.status(400).json({msm:"IMAGEN DNI / FACE NO RECIBIDA"})
    }

    const rekognition = new AWS.Rekognition();

    const params = {
        Image: {
            Bytes: file_dni_picture.buffer
        }
    }

    try {
        const response = await rekognition.detectText(params).promise();
        const detections = response.TextDetections.map(detects=> detects.DetectedText)

        var isEncontrado = detections.some(detections => detections.includes(req.body.dni_client))

        if(!isEncontrado) return res.status(200).json({
            stadus_code : 300,
            similarity:0,
            msm : "No se ha podido identificar el numero de cédula"
        })

        var params_ = {
            SourceImage: {
                Bytes: file_dni_picture.buffer
            },
            TargetImage: {
                Bytes: file_face_picture.buffer
            },
            SimilarityThreshold: 70
        }

        rekognition.compareFaces(params_,function (error,response){
            if (error) return res.status(400).json({
                msm : error.toString()
            })

            return res.status(200).json({
                stadus_code : response.FaceMatches.length > 0 ? 200 : 300,
                similarity: response.FaceMatches.length > 0 ? parseFloat((response.FaceMatches[0].Similarity).toFixed(2)) : 0,
                msm : response.FaceMatches.length == 0 ? "NO SE RETORNO EL FACEMATCHES" : "API REST FACE ID OK"
            })
        })

        /*res.status(200).json({
            stadus_code : 200,
            data: dataCompare,
            msm : "NUMERO DE DNI ENCONTRADO"
        })*/


    } catch (error) {
        return res.status(500).send({msm:error.toString()})
    }
})

app.put('/updateTokenFirebase',Jwt.checkJwt,async function(req,res){
    try {
        await ClientController.updateTokenNotificationController(req.body.code_id_client,req.body.code_usu_banca,req.body.tokenfirebase)
        res.status(200).json({msm:"TOKEN FIREBASE OK"})
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

app.put('/updateProfile',Jwt.checkJwt,async function(req,res)
{
    //console.log(req.body)
    try {
        var data = await ClientController.updateProfileClientController(req.body.code_id_client,
            req.body.welcome,req.body.phone,req.body.email)
        if(data.error == undefined){
            try {
                Notification.sentNotificationPush(req.body.code_dni_client,req.body.code_id_client,process.env.NAMECOOP,
                    `ESTIMADO SOCIO(A) SUS DATOS PERSONALES HAN SIDO ACTUALIZADOS CON ÉXITO\n${getFechaHoraActual()}.`)
            }catch (e) {
                console.log(`ERROR SEND NOTIFICATION UPDATE PROFILE ${e.toString()}`)
            }
            res.status(200).json({msm:'DATOS ACTUALIZADOS CON ÉXITO'})
        }else{
            res.status(500).json({msm: data.error})
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

app.put('/updateDataAccessClient',Jwt.checkJwt,async function(req,res)
{
    var response = await ClientController.updateDataInfoLoginController(req.body.code_id_client,req.body.code_usu_banca,
        req.body.imei,req.body.ip)
    // FONDO DE INVERSION -- QUITO
    try {
        if(response.error == undefined)
        {
            res.status(200).json({msm:"DATOS OK"})
        }else{
            res.status(500).json({msm:response.error})
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})


app.get('/cajas_oficina',Jwt.checkJwt,async function(req,res)
{
    try {
        var response = await ClientController.readCajaClientController(req.body.code_id_client,
            req.body.clien_cod_ofici);
        if(response.error != undefined){
            res.status(500).json({msm:response.error})
        }else{
            res.status(200).json(response.data)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

module.exports = app


