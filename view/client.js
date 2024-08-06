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
const {downloadImageAndConvertToBlob} = require('../util/downloadImage')

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

app.get('/isExistAccount/:codeclien',async function(req,res){
    try {
        var response = await ClientController.checkExistAccountBancaController(req.params.codeclien)
        //console.log(response)
        res.status(response ? 200 : 500).json({msm:response ? "OK" : "Lo sentimos, ya posee una cuenta de banca móvil/web."})
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})


app.post('/createUserBanca',async function(req,res){
    try {
        var response = await ClientController.createNewUserController(req.body.usuario_banca,
            req.body.clien_cod_clien,req.body.contrasenia_banca,req.body.welcome_msm)
        //console.log(response)
        if(response){
            res.status(200).json({msm:"OK"})
        }else{
            res.status(500).json({msm:'Lamentamos informarle que no ha sido posible crear su cuenta en este momento.'})
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

app.get('/isExistUsername/:username',async function(req,res){
    try {
        var response = await ClientController.isExistUsernameController(req.params.username)
        //console.log(response)
        res.status(response ? 200 : 500).json({msm:response ? "OK" : "Lo sentimos, el nombre de usuario no está disponible."})
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

app.put('/recovery_update_password',async function(req,res)
{
    try {
        var response = await ClientController.updatePasswordController(req.body.idClient,req.body.passw)
        if(response.error != undefined){
            res.status(500).json({msm:response.error})
        }else{
            res.status(200).json({msm:"Su contraseña ha sido actualizada con éxito"})
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
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
    //console.log(req.body)
    try{

        var data = await ClientController.loginClientController(req.body.usuario,req.body.password)
        if(data.data[0] == undefined){
            return res.status(204).json({
                msm:'SUS CREDENCIALES SON INCORRECTAS.'
            })
        }
        //console.log(data.data[0])
        var jwt = data.data.length > 0 ? Jwt.createJWT(data.data[0]) : null

        /*if(data.data[0].imei_ult_ingreso != null && data.data[0].imei_ult_ingreso != undefined)
        {
            if(data.data[0].imei_ult_ingreso != req.body.imeiaccess)
            {
                return res.status(500).json({ msm : "NO PUEDE INICIAR SESIÓN EN LA APLICACIÓN PORQUE YA ESTÁ ABIERTA EN OTRO DISPOSITIVO. POR FAVOR, CIERRA LA SESIÓN EN EL OTRO DISPOSITIVO PARA PODER ACCEDER AQUÍ."})
            }
        }*/

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
                    clien_fot_paths:(process.env["PATHSERVERIMG"]+data.data[0].clien_fot_paths).replaceAll('u:/',''),
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

app.post('/check_face_id/:idClient',upload.fields([{ name: 'face_picture', maxCount: 1 }]),async function(req,res)
{

    var oResponseDataValidate = await ClientController.readDataValidateController(req.params.idClient,false)

    if(oResponseDataValidate.error != undefined){
        return res.status(500).json(oResponseDataValidate.error)
    }
    if(oResponseDataValidate.data.clien_fot_dni_front == null || oResponseDataValidate.data.clien_fot_dni_back == null
        || oResponseDataValidate.data.clien_fot_face == null || oResponseDataValidate.data.clien_fot_dni_front.isEmpty
        || oResponseDataValidate.data.clien_fot_dni_back.isEmpty
        || oResponseDataValidate.data.clien_fot_face.isEmpty)
    {
        return res.status(204).json({msm:'Por favor, acérquese a una agencia para actualizar sus datos.'})
    }

    const file_dni_picture  = await downloadImageAndConvertToBlob(oResponseDataValidate.data.clien_fot_face)
    const file_face_picture  = req.files['face_picture'][0]

    if(!file_face_picture) {
        return res.status(400).json({msm:"IMAGEN FACIAL NO RECIBIDA"})
    }

    const rekognition = new AWS.Rekognition();

    /*const params = {
        Image: {
            Bytes: file_dni_picture.buffer
        }
    }*/

    try {
        /*const response = await rekognition.detectText(params).promise();
        const detections = response.TextDetections.map(detects=> detects.DetectedText)

        var isEncontrado = detections.some(detections => detections.includes(req.body.dni_client))

        if(!isEncontrado) return res.status(200).json({
            stadus_code : 300,
            similarity:0,
            msm : "No se ha podido identificar el numero de cédula"
        })*/

        var params_ = {
            SourceImage: {
                Bytes: file_dni_picture.buffer
            },
            TargetImage: {
                Bytes: file_face_picture.buffer
            },
            SimilarityThreshold: 70
        }

        rekognition.compareFaces(params_,function (error,response)
        {
            if (error) return res.status(500).json({
                msm : error.toString()
            })

            return res.status(200).json({
                similarity: response.FaceMatches.length > 0 ? (response.FaceMatches[0].Similarity) : 0,
                msm : response.FaceMatches.length == 0 ? "Lo sentimos, no hemos podido reconocer tus rasgos faciales." : `SIMILITUD DE ${response.FaceMatches[0].Similarity} %`
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

app.post('/check_dni',async function(req,res)
{
    //console.log(req.body)
    try {
        // Obtiene las url para validar los datos
        var oResponseDataValidate = await ClientController.readDataValidateController(req.body.dni_client,req.body.searchDni)
        //console.log(oResponseDataValidate.data[0])

        if(oResponseDataValidate.error != undefined){
            return res.status(500).json(oResponseDataValidate.error)
        }
        if(oResponseDataValidate.data.clien_fot_dni_front == null || oResponseDataValidate.data.clien_fot_dni_back == null
            || oResponseDataValidate.data.clien_fot_face == null || oResponseDataValidate.data.clien_fot_dni_front.isEmpty
            || oResponseDataValidate.data.clien_fot_dni_back.isEmpty
            || oResponseDataValidate.data.clien_fot_face.isEmpty)
        {
            return res.status(204).json({msm:'Por favor, acérquese a una agencia para actualizar sus datos.'})
        }

        /*var file_dni_picture  = await downloadImageAndConvertToBlob('http://172.31.5.164/firmfoto/ofic3101/fttest002.jpg')
        var file_dni_picture_back  = await downloadImageAndConvertToBlob('http://172.31.5.164/firmfoto/ofic3101/fttest003.jpg')*/

        var file_dni_picture  = await downloadImageAndConvertToBlob(oResponseDataValidate.data.clien_fot_dni_front)
        var file_dni_picture_back  = await downloadImageAndConvertToBlob(oResponseDataValidate.data.clien_fot_dni_back)
        //const file_face_picture  = req.files['face_picture'][0]

        if(!file_dni_picture && !file_dni_picture_back) {
            return res.status(400).json({msm:"IMAGEN DNI NO RECIBIDA"})
        }

        const rekognition = new AWS.Rekognition();

        const params = {
            Image: {
                Bytes: file_dni_picture.buffer
            }
        }

        const paramshuella = {
            Image: {
                Bytes: file_dni_picture_back.buffer
            }
        }

        try {
            const response = await rekognition.detectText(params).promise();
            const responseHuella = await rekognition.detectText(paramshuella).promise();

            const detections = response.TextDetections.map(detects=> detects.DetectedText)
            const detectionsHuella = responseHuella.TextDetections.map(detects=> detects.DetectedText)

            var isEncontradoDni = detections.some(detections => detections.includes(req.body.dni_client))
            var isHuellaDac = detectionsHuella.some(detections => detections.includes(req.body.huella))

            if(isEncontradoDni && isHuellaDac)
            {
                res.status(200).json({
                    msm:"DATOS ENCONTRADO CON EXITO",
                    clien_cod_clien:oResponseDataValidate.data.clien_cod_clien,
                    welcome_msm: oResponseDataValidate.data.welcome_msm
                })
            }else{
                res.status(500).json({
                    msm: `No se ha podido identificar el numero de cédula / huella dactilar`
                })
            }

            /*if(!isEncontrado) return res.status(200).json({
                stadus_code : 300,
                similarity:0,
                msm : "No se ha podido identificar el numero de cédula"
            })*/

        } catch (error) {
            return res.status(500).send({msm:error.toString()})
        }
    }catch (e) {
        return res.status(500).send({msm: "Lo sentimos, sus credenciales no han sido encontradas."})
    }
})

module.exports = app


