const nodemailer = require('nodemailer')
const express = require("express")
const app = express()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "trailermovil66@gmail.com",
        pass: 'nrpqbljogyncqnnt'
    }
});
app.post("/send_email_notification",async function(req,res)
{
    try {

        const info = await transporter.sendMail({
            from: '"API BANK 🎊" <test@example.com>', // sender address
            to: [req.body.email], // list of receivers
            subject: req.body.subject, // Subject line
            html: req.body.html_content, // html body
        });

        res.status(200).json({status_code:200,msm:"OK EMAIL"})
    }catch (e) {
        res.status(400).json({status_code:400,msm:e.toString()})
    }
})

module.exports = app
