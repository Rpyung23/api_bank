const FirebaseModel = require('../model/firebase.model')
class FirebaseController {
    static async sendNotificationTokenController(token,title,body){
        return await FirebaseModel.sendNotificationTokenModel(token,title,body)
    }
}

module.exports = FirebaseController