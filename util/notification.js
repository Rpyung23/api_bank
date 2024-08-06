require('dotenv').config()
const nodemailer = require('nodemailer')
const ClientController = require('../controller/client.controller')
const FirebaseController = require('../controller/firebase.controller')

const transporter = nodemailer.createTransport({
    host: process.env.HOSTEMAIL,
    port: parseInt(process.env.PORTEMAIL),
    secure: true,
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSEMAIL
    }
});

//console.log(transporter)


class Notification
{
    static  async sentNotificationEmail(dni_client,code_client,subject,content)
    {
        try{
            var data = await  ClientController.readDataClientNotificationController(code_client,dni_client)
            //console.log(data)
            const info = await transporter.sendMail({
                from: process.env.NAMECOOP, // sender address
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