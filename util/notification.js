const nodemailer = require('nodemailer')

const ClientController = require('../controller/client.controller')

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
                from: '"NOTIFICATION ACTIVIDAD APP MOVIL 🎊" <test@example.com>', // sender address
                to: [data.clien_dir_email], // list of receivers
                subject: subject, // Subject line
                html: content, // html body
            });
        }catch (e) {
            console.log(`ERROR SEND EMAIL : ${e.toString()}`)
        }

    }
}

module.exports = Notification