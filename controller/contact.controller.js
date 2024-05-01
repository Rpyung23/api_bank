const ContactModel = require('../model/contact.model')
class ContactController
{
    static async checkContacController(account){
        return await ContactModel.checkContacModel(account)
    }
    static  async readMyContactController(usuario){
        return await ContactModel.readMyContactModel(usuario)
    }
}

module.exports = ContactController