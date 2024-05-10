require('dotenv').config()
//GOOGLE_APPLICATION_CREDENTIALS = .\util\firebase.json
const {initializeApp,applicationDefault} = require('firebase-admin/app');
const {getMessaging} = require("firebase-admin/messaging");
const {getDatabase} = require("firebase-admin/database");

initializeApp({
    credential: applicationDefault(),
    privateKey:'./util/firebase.json',
    databaseURL: 'https://bank-da882-default-rtdb.firebaseio.com/',
    algorithm: 'RS256'
});

class FirebaseModel
{
    static async sendNotificationTokenModel(token,title,body)
    {
        try {

            //getDatabase().ref('s').set({'asd':'sda'})
            await getMessaging().send( {
                notification: {
                    title: title,
                    body: body
                },
                token: token
            })
            return 'NOTIFICATION SEND OK'
        }catch (e) {
            console.log(e)
            return e.toString()
        }

    }
}

module.exports = FirebaseModel