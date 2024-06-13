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

    static async createContactLocalController(usuario_banca,account,name_complete,codeContact){
        return await ContactModel.createContactLocalModel(usuario_banca,account,name_complete,codeContact)
    }

    static async createContactExternalController(fk_usuario_banca,num_ctadp_cod_ctadp,typeaccount,
                                            fk_ifina_cod_ifina,namecontact,codecontact,typecodecontact,
                                            email_contact){
        return await ContactModel.createContactExternalModel(fk_usuario_banca,num_ctadp_cod_ctadp,typeaccount,
            fk_ifina_cod_ifina,namecontact,codecontact,typecodecontact,
            email_contact);
    }

}

module.exports = ContactController