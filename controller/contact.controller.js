const ContactModel = require('../model/contact.model')
class ContactController
{
    static async checkExistContactController(usuario_banca,account){
        return await ContactModel.checkExistContactModel(usuario_banca,account)
    }
    static async readNewDataContacLocalModel(account){
        return await ContactModel.readNewDataContacLocalModel(account)
    }
    static  async readMyContactController(usuario){
        return await ContactModel.readMyContactModel(usuario)
    }

    static async createContactLocalController(usuario_banca,account,name_complete){
        return await ContactModel.createContactLocalModel(usuario_banca,account,name_complete)
    }

}

module.exports = ContactController