const AWS = require('aws-sdk')
const multer = require('multer');
const upload = multer();
const express = require('express')
const app = express()
const ClientController = require('../controller/client.controller')


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

app.get('/profile_client',async function(req,res)
{
    var data = await ClientController.readProfileClientController(9187)
    res.status(200).json(data)
})

app.post('/test_api',function (req,res){
    res.status(200).json({mensaje:'TEST API REST'})
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
                stadus_code : 200,
                similarity: parseFloat((response.FaceMatches[0].Similarity).toFixed(2)),
                msm : "API REST FACE ID OK"
            })
        })

        /*res.status(200).json({
            stadus_code : 200,
            data: dataCompare,
            msm : "NUMERO DE DNI ENCONTRADO"
        })*/


    } catch (error) {
        return res.status(400).send({msm:error.toString()})
    }
})


module.exports = app

