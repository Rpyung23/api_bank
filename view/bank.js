const express =  require('express')
const app = express()
const BankController = require('../controller/bank.controller')
app.get('/listbankactive',async function (req, res)
{
    try {
        var data = await BankController.readListBankActiveController()
        if(data.error != undefined){
            res.status(500).json({msm:data.error})
        }else{
            res.status(200).json(data.data)
        }
    }catch (e) {
        res.status(500).json({msm:e.toString()})
    }
})

module.exports = app