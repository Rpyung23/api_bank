require('dotenv').config()
const nodemailer = require('nodemailer')
const ClientController = require('../controller/client.controller')
const FirebaseController = require('../controller/firebase.controller')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "trailermovil66@gmail.com",
        pass: 'nrpqbljogyncqnnt'
    }
});


class Notification
{
    static  async sentNotificationEmail(dni_client,code_client,subject,content)
    {
        try{
            var data = await  ClientController.readDataClientNotificationController(code_client,dni_client)
            //console.log(data)
            const info = await transporter.sendMail({
                from: process.env.NAMECOOP+' <trailermovil66@gmail.com>', // sender address
                to: [data.clien_dir_email], // list of receivers
                subject: subject, // Subject line
                html: content, // html body
            });
            console.log(`NOTIFICATION EMAIL OK : ${data.clien_dir_email}`)
        }catch (e) {
            console.log(`ERROR SEND EMAIL : ${e.toString()}`)
        }

    }

    static  async sentNotificationEmail(dni_client,code_client,subject,content)
    {
        try{
            var data = await  ClientController.readDataClientNotificationController(code_client,dni_client)
            //console.log(data)
            const info = await transporter.sendMail({
                from: process.env.NAMECOOP+' <trailermovil66@gmail.com>', // sender address
                to: [data.clien_dir_email], // list of receivers
                subject: subject, // Subject line
                html: content, // html body
            });
            console.log(`NOTIFICATION EMAIL OK : ${data.clien_dir_email}`)
        }catch (e) {
            console.log(`ERROR SEND EMAIL : ${e.toString()}`)
        }

    }

    static  async sentNotificationPush(dni_client,code_client,title,body)
    {
        try{
            var data = await  ClientController.readDataClientNotificationController(code_client,dni_client)
            await FirebaseController.sendNotificationTokenController(data.token_ult_notificacion,title,body)
            console.log(`NOTIFICATION PUSH OK : ${data.clien_dir_email}`)
        }catch (e) {
            console.log(e)
            console.log(`ERROR SEND EMAIL : ${e.toString()}`)
        }

    }
}

module.exports = Notification